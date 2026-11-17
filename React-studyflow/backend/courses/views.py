from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db import models
from django.db.models import Q, Avg, Count
from django.shortcuts import get_object_or_404

from .models import Discipline, Course, Topic, UserProgress, LearningSession, GlossaryTerm
from .learning import validate_session_flow
from .serializers import (
    DisciplineSerializer,
    CourseListSerializer,
    CourseDetailSerializer,
    TopicListSerializer,
    TopicDetailSerializer,
    UserProgressSerializer,
    LearningSessionSerializer,
    LearningSessionUpdateSerializer,
    GlossaryTermListSerializer,
    GlossaryTermDetailSerializer,
    GlossaryTermBookmarkSerializer,
)


class DisciplineViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for disciplines."""
    queryset = Discipline.objects.filter(is_active=True)
    serializer_class = DisciplineSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for courses."""
    queryset = Course.objects.filter(is_active=True).select_related('discipline').prefetch_related('topics')
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['code', 'title', 'description']
    ordering_fields = ['code', 'title', 'order']
    ordering = ['order', 'code']
    lookup_field = 'code'
    lookup_url_kwarg = 'courseId'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseListSerializer
    
    @action(detail=True, methods=['get'])
    def topics(self, request, pk=None):
        """Get all topics for a course."""
        course = self.get_object()
        topics = course.topics.filter(is_active=True)
        serializer = TopicListSerializer(topics, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], url_path='topics/(?P<topic_id>[^/.]+)')
    def topic(self, request, courseId=None, topic_id=None):
        """Get a specific topic for a course."""
        course = self.get_object()
        try:
            topic = course.topics.get(topic_id=topic_id, is_active=True)
        except Topic.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TopicDetailSerializer(topic, context={'request': request})
        return Response(serializer.data)


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for topics."""
    queryset = Topic.objects.filter(is_active=True).select_related('course', 'course__discipline')
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'notes']
    ordering_fields = ['order', 'title']
    ordering = ['course', 'order']
    # The frontend routes use the stable topic slug (e.g. cos201-t1)
    # instead of the numeric database primary key.
    lookup_field = 'topic_id'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TopicDetailSerializer
        return TopicListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return super().retrieve(request, *args, **kwargs)


class LearningSessionViewSet(viewsets.GenericViewSet):
    """Read or update the authenticated learner's deterministic topic session."""
    permission_classes = [IsAuthenticated]
    serializer_class = LearningSessionSerializer

    @action(
        detail=False,
        methods=['get', 'put'],
        url_path=r'topic/(?P<topic_id>[^/.]+)',
    )
    def by_topic(self, request, topic_id=None):
        topic = get_object_or_404(
            Topic.objects.select_related('course'),
            topic_id=topic_id,
            is_active=True,
        )
        flow = topic.learning_guide.get('sessionFlow')
        if not isinstance(flow, dict):
            return Response(
                {'detail': 'A guided learning session is not available for this topic.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            validate_session_flow(flow)
        except ValueError as error:
            return Response(
                {'detail': f'The guided lesson is not configured correctly: {error}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        nodes = {
            node['id']: node
            for node in flow.get('nodes', [])
            if isinstance(node, dict) and isinstance(node.get('id'), str)
        }
        if flow['startNodeId'] not in nodes:
            return Response(
                {'detail': 'The guided lesson is not configured correctly.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        session, _ = LearningSession.objects.get_or_create(
            user=request.user,
            topic=topic,
            defaults={'current_node_id': flow['startNodeId']},
        )

        if request.method == 'GET':
            if session.current_node_id not in nodes:
                return Response(
                    {'detail': 'This saved session no longer matches the lesson. Restart the session to continue.'},
                    status=status.HTTP_409_CONFLICT,
                )
            return Response(LearningSessionSerializer(session).data)

        serializer = LearningSessionUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        values = serializer.validated_data

        choices_by_node = {
            node_id: {
                choice['id']
                for choice in node.get('question', {}).get('choices', [])
                if isinstance(choice, dict) and isinstance(choice.get('id'), str)
            }
            for node_id, node in nodes.items()
        }
        concept_ids = {
            node['conceptId']
            for node in nodes.values()
            if isinstance(node.get('conceptId'), str)
        }
        misconception_ids = {
            outcome['misconceptionId']
            for node in nodes.values()
            for outcome in node.get('outcomes', {}).values()
            if isinstance(outcome, dict) and isinstance(outcome.get('misconceptionId'), str)
        }

        if values['current_node_id'] not in nodes:
            return Response(
                {'current_node_id': 'Unknown lesson step.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if (
            values['pending_choice_id']
            and values['pending_choice_id'] not in choices_by_node[values['current_node_id']]
        ):
            return Response(
                {'pending_choice_id': 'This answer is not available for the current step.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not set(values['concept_states']).issubset(concept_ids):
            return Response(
                {'concept_states': 'Unknown lesson concept.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not set(values['misconceptions']).issubset(misconception_ids):
            return Response(
                {'misconceptions': 'Unknown lesson misconception.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        for response in values['responses']:
            node_id = response.get('nodeId')
            choice_id = response.get('choiceId')
            if node_id not in choices_by_node or choice_id not in choices_by_node[node_id]:
                return Response(
                    {'responses': 'A recorded answer does not match this lesson.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            misconception_id = response.get('misconceptionId')
            outcome = nodes[node_id].get('outcomes', {}).get(choice_id, {})
            if misconception_id and (
                misconception_id not in misconception_ids
                or misconception_id != outcome.get('misconceptionId')
            ):
                return Response(
                    {'responses': 'A recorded misconception is not part of this lesson.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        if values['is_completed']:
            last_response = values['responses'][-1] if values['responses'] else {}
            completion_outcome = nodes.get(last_response.get('nodeId'), {}).get(
                'outcomes', {}
            ).get(last_response.get('choiceId'), {})
            if (
                last_response.get('nodeId') != values['current_node_id']
                or completion_outcome.get('conceptStatus') != 'understood'
                or completion_outcome.get('nextNodeId') is not None
                or values['pending_choice_id']
            ):
                return Response(
                    {'is_completed': 'Complete the final lesson step before marking the session complete.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        session.current_node_id = values['current_node_id']
        session.responses = values['responses']
        session.concept_states = values['concept_states']
        session.misconceptions = values['misconceptions']
        session.pending_choice_id = values['pending_choice_id']
        session.is_completed = values['is_completed']
        session.save(update_fields=[
            'current_node_id', 'responses', 'concept_states', 'misconceptions',
            'pending_choice_id', 'is_completed', 'updated_at',
        ])
        return Response(LearningSessionSerializer(session).data)


class UserProgressViewSet(viewsets.ModelViewSet):
    """ViewSet for user progress tracking."""
    serializer_class = UserProgressSerializer
    permission_classes = [AllowAny]
    
    def _get_user(self):
        user = self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
        return user
    
    def _get_anonymous_user(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user, _ = User.objects.get_or_create(
            username='anonymous',
            defaults={'email': 'anonymous@studyflow.local', 'first_name': 'Anonymous', 'last_name': 'User'}
        )
        return user
    
    def get_queryset(self):
        user = self._get_user()
        return UserProgress.objects.filter(user=user).select_related('topic', 'topic__course')
    
    def perform_create(self, serializer):
        serializer.save(user=self._get_user())
    
    @action(detail=True, methods=['post'])
    def bookmark(self, request, pk=None):
        """Toggle bookmark for a topic."""
        progress = self.get_object()
        progress.is_bookmarked = not progress.is_bookmarked
        if progress.is_bookmarked:
            from django.utils import timezone
            progress.bookmarked_at = timezone.now()
        else:
            progress.bookmarked_at = None
        progress.save(update_fields=['is_bookmarked', 'bookmarked_at'])
        return Response({'is_bookmarked': progress.is_bookmarked})
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark topic as completed."""
        progress = self.get_object()
        progress.is_completed = True
        progress.completion_percentage = 100
        from django.utils import timezone
        progress.completed_at = timezone.now()
        progress.save(update_fields=['is_completed', 'completion_percentage', 'completed_at'])
        return Response({'status': 'completed'})
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get progress summary for the user."""
        queryset = self.get_queryset()
        total = queryset.count()
        completed = queryset.filter(is_completed=True).count()
        in_progress = queryset.filter(completion_percentage__gt=0, is_completed=False).count()
        avg_progress = queryset.aggregate(avg=Avg('completion_percentage'))['avg'] or 0
        
        # Progress by course
        by_course = queryset.values('topic__course__code', 'topic__course__title').annotate(
            total=Count('id'),
            completed=Count('id', filter=Q(is_completed=True)),
            avg_progress=Avg('completion_percentage')
        ).order_by('-avg_progress')
        
        return Response({
            'total_topics': total,
            'completed': completed,
            'in_progress': in_progress,
            'not_started': total - completed - in_progress,
            'average_progress': round(avg_progress),
            'by_course': list(by_course),
        })


class GlossaryTermViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for glossary terms."""
    queryset = GlossaryTerm.objects.select_related('discipline').prefetch_related(
        'related_courses', 'related_terms', 'bookmarked_by'
    )
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['term', 'short_definition', 'full_definition', 'category']
    ordering_fields = ['term', 'view_count', 'created_at']
    ordering = ['term']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GlossaryTermDetailSerializer
        return GlossaryTermListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by discipline
        discipline = self.request.query_params.get('discipline')
        if discipline:
            queryset = queryset.filter(discipline__slug=discipline)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__iexact=category)
        
        # Filter by difficulty
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        # Filter starred/bookmarked
        starred = self.request.query_params.get('starred')
        if starred:
            user = self._get_user()
            queryset = queryset.filter(bookmarked_by=user)
        
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        GlossaryTerm.objects.filter(pk=instance.pk).update(view_count=models.F('view_count') + 1)
        return super().retrieve(request, *args, **kwargs)
    
    def _get_user(self):
        user = self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
        return user
    
    def _get_anonymous_user(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user, _ = User.objects.get_or_create(
            username='anonymous',
            defaults={'email': 'anonymous@studyflow.local', 'first_name': 'Anonymous', 'last_name': 'User'}
        )
        return user
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def bookmark(self, request, pk=None):
        """Toggle bookmark for a glossary term."""
        term = self.get_object()
        user = self._get_user()
        
        if term.bookmarked_by.filter(id=user.id).exists():
            term.bookmarked_by.remove(user)
            bookmarked = False
        else:
            term.bookmarked_by.add(user)
            bookmarked = True
        
        return Response({'is_bookmarked': bookmarked})
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all unique categories."""
        categories = GlossaryTerm.objects.values_list('category', flat=True).distinct().exclude(category='').order_by('category')
        return Response(list(categories))
    
    @action(detail=False, methods=['get'])
    def disciplines(self, request):
        """Get all disciplines with term counts."""
        disciplines = Discipline.objects.filter(is_active=True).annotate(
            term_count=Count('glossary_terms')
        ).values('id', 'name', 'slug', 'icon', 'color', 'term_count')
        return Response(list(disciplines))