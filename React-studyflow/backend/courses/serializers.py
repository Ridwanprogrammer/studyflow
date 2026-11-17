from rest_framework import serializers
from django.db import models
from .models import Discipline, Course, Topic, UserProgress, LearningSession, GlossaryTerm


class DisciplineSerializer(serializers.ModelSerializer):
    course_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Discipline
        fields = ['id', 'name', 'slug', 'icon', 'color', 'order', 'course_count']
    
    def get_course_count(self, obj):
        return obj.courses.filter(is_active=True).count()


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for course lists."""
    discipline = DisciplineSerializer(read_only=True)
    topic_count = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = [
            'id', 'code', 'title', 'description', 'discipline',
            'level', 'semester', 'credits', 'topic_count',
            'user_progress', 'is_active'
        ]
    
    def get_topic_count(self, obj):
        return obj.topics.filter(is_active=True).count()
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            progress = UserProgress.objects.filter(
                user=request.user,
                topic__course=obj
            ).aggregate(
                avg_progress=models.Avg('completion_percentage'),
                completed=models.Count('id', filter=models.Q(is_completed=True)),
                total=models.Count('id')
            )
            return {
                'average': round(progress['avg_progress'] or 0),
                'completed': progress['completed'],
                'total': progress['total'],
            }
        return None


class TopicListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for topic lists."""
    course_code = serializers.CharField(source='course.code', read_only=True)
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Topic
        fields = [
            'id', 'topic_id', 'title', 'course_code', 'order',
            'estimated_read_time', 'user_progress', 'is_active'
        ]
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                progress = UserProgress.objects.get(user=request.user, topic=obj)
                return {
                    'is_completed': progress.is_completed,
                    'completion_percentage': progress.completion_percentage,
                    'is_bookmarked': progress.is_bookmarked,
                }
            except UserProgress.DoesNotExist:
                pass
        return None


class TopicDetailSerializer(serializers.ModelSerializer):
    """Full topic detail with notes and learning guide."""
    course = CourseListSerializer(read_only=True)
    user_progress = serializers.SerializerMethodField()
    previous_topic = serializers.SerializerMethodField()
    next_topic = serializers.SerializerMethodField()
    
    class Meta:
        model = Topic
        fields = [
            'id', 'topic_id', 'title', 'notes', 'learning_guide',
            'course', 'order', 'estimated_read_time',
            'user_progress', 'previous_topic', 'next_topic',
            'created_at', 'updated_at'
        ]
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                progress = UserProgress.objects.get(user=request.user, topic=obj)
                return {
                    'is_completed': progress.is_completed,
                    'completion_percentage': progress.completion_percentage,
                    'time_spent': progress.time_spent,
                    'is_bookmarked': progress.is_bookmarked,
                    'personal_notes': progress.personal_notes,
                }
            except UserProgress.DoesNotExist:
                pass
        return None
    
    def get_previous_topic(self, obj):
        prev = Topic.objects.filter(
            course=obj.course, order__lt=obj.order, is_active=True
        ).order_by('-order').first()
        if prev:
            return {'id': prev.id, 'topic_id': prev.topic_id, 'title': prev.title}
        return None
    
    def get_next_topic(self, obj):
        nxt = Topic.objects.filter(
            course=obj.course, order__gt=obj.order, is_active=True
        ).order_by('order').first()
        if nxt:
            return {'id': nxt.id, 'topic_id': nxt.topic_id, 'title': nxt.title}
        return None


class CourseDetailSerializer(CourseListSerializer):
    """Full course detail with topics."""
    topics = serializers.SerializerMethodField()

    class Meta(CourseListSerializer.Meta):
        fields = CourseListSerializer.Meta.fields + ['topics']

    def get_topics(self, obj):
        topics = obj.topics.filter(is_active=True).order_by('order')
        return TopicListSerializer(topics, many=True, context=self.context).data


class UserProgressSerializer(serializers.ModelSerializer):
    topic_title = serializers.CharField(source='topic.title', read_only=True)
    course_code = serializers.CharField(source='topic.course.code', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = [
            'id', 'topic', 'topic_title', 'course_code',
            'is_completed', 'completion_percentage', 'time_spent',
            'is_bookmarked', 'personal_notes',
            'started_at', 'completed_at', 'updated_at'
        ]
        read_only_fields = ['id', 'started_at', 'completed_at', 'updated_at']


class LearningSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningSession
        fields = [
            'id', 'topic', 'current_node_id', 'responses', 'concept_states',
            'misconceptions', 'pending_choice_id', 'is_completed', 'updated_at',
        ]
        read_only_fields = ['id', 'topic', 'updated_at']


class LearningSessionUpdateSerializer(serializers.Serializer):
    current_node_id = serializers.CharField(max_length=100)
    responses = serializers.ListField(
        child=serializers.DictField(),
        max_length=500,
    )
    concept_states = serializers.DictField(
        child=serializers.ChoiceField(choices=['understood', 'needs_review']),
    )
    misconceptions = serializers.ListField(
        child=serializers.CharField(max_length=100),
        max_length=200,
    )
    pending_choice_id = serializers.CharField(max_length=100, allow_blank=True)
    is_completed = serializers.BooleanField()


class GlossaryTermListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for glossary term lists."""
    discipline = DisciplineSerializer(read_only=True)
    is_bookmarked = serializers.SerializerMethodField()
    
    class Meta:
        model = GlossaryTerm
        fields = [
            'id', 'term', 'slug', 'short_definition', 'discipline',
            'category', 'difficulty', 'is_featured', 'is_bookmarked',
            'view_count'
        ]
    
    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookmarked_by.filter(id=request.user.id).exists()
        return False


class GlossaryTermDetailSerializer(serializers.ModelSerializer):
    """Full glossary term detail."""
    discipline = DisciplineSerializer(read_only=True)
    related_courses = CourseListSerializer(many=True, read_only=True)
    related_terms = GlossaryTermListSerializer(many=True, read_only=True)
    is_bookmarked = serializers.SerializerMethodField()
    
    class Meta:
        model = GlossaryTerm
        fields = [
            'id', 'term', 'slug', 'short_definition', 'full_definition',
            'formal_definition', 'discipline', 'category',
            'related_courses', 'related_terms', 'worked_examples',
            'difficulty', 'is_featured', 'is_bookmarked', 'view_count',
            'created_at', 'updated_at'
        ]
    
    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookmarked_by.filter(id=request.user.id).exists()
        return False


class GlossaryTermBookmarkSerializer(serializers.Serializer):
    term_id = serializers.IntegerField()