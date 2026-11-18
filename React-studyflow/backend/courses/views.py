from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db import models
from django.db.models import Q, Avg, Count
from django.shortcuts import get_object_or_404

from .models import Discipline, Course, Topic, UserProgress, LearningSession, GlossaryTerm
from .learning import replay_session_state, validate_session_flow, validate_session_state
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

        nodes = {node['id']: node for node in flow['nodes']}
        session, _ = LearningSession.objects.get_or_create(
            user=request.user,
            topic=topic,
            defaults={'current_node_id': flow['startNodeId']},
        )

        if request.method == 'GET':
            saved_values = {
                'current_node_id': session.current_node_id,
                'responses': session.responses,
                'concept_states': session.concept_states,
                'misconceptions': session.misconceptions,
                'pending_choice_id': session.pending_choice_id,
                'is_completed': session.is_completed,
            }
            try:
                validate_session_state(flow, saved_values)
            except ValueError:
                if not session.is_completed or session.pending_choice_id:
                    return Response(
                        {'detail': 'This saved session no longer matches the lesson. Restart the session to continue.'},
                        status=status.HTTP_409_CONFLICT,
                    )
                try:
                    upgraded_values = replay_session_state(flow, session.responses)
                except ValueError:
                    return Response(
                        {'detail': 'This saved session no longer matches the lesson. Restart the session to continue.'},
                        status=status.HTTP_409_CONFLICT,
                    )
                if (
                    upgraded_values['is_completed']
                    or upgraded_values['current_node_id'] == session.current_node_id
                    or upgraded_values['concept_states'] != session.concept_states
                    or upgraded_values['misconceptions'] != session.misconceptions
                ):
                    return Response(
                        {'detail': 'This saved session no longer matches the lesson. Restart the session to continue.'},
                        status=status.HTTP_409_CONFLICT,
                    )
                session.current_node_id = upgraded_values['current_node_id']
                session.is_completed = upgraded_values['is_completed']
                session.save(update_fields=['current_node_id', 'is_completed', 'updated_at'])
            if session.current_node_id not in nodes:
                return Response(
                    {'detail': 'This saved session no longer matches the lesson. Restart the session to continue.'},
                    status=status.HTTP_409_CONFLICT,
                )
            return Response(LearningSessionSerializer(session).data)

        serializer = LearningSessionUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        values = serializer.validated_data
        try:
            validate_session_state(flow, values)
        except ValueError as error:
            return Response(
                {'detail': str(error)},
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