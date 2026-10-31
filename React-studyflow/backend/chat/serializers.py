from rest_framework import serializers
from .models import ChatSession, ChatMessage, AIUsageLog
from courses.serializers import CourseListSerializer, TopicListSerializer


class ChatMessageSerializer(serializers.ModelSerializer):
    """Serializer for chat messages."""
    
    class Meta:
        model = ChatMessage
        fields = [
            'id', 'role', 'content', 'attachments',
            'model_used', 'tokens_used', 'generation_time_ms',
            'is_regenerated', 'parent_message',
            'is_helpful', 'feedback_text',
            'created_at',
        ]
        read_only_fields = [
            'id', 'model_used', 'tokens_used', 'generation_time_ms',
            'is_regenerated', 'parent_message', 'created_at',
        ]


class ChatMessageCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating user messages."""
    
    class Meta:
        model = ChatMessage
        fields = ['role', 'content', 'attachments']
    
    def validate_role(self, value):
        if value != 'user':
            raise serializers.ValidationError("Only 'user' role messages can be created directly.")
        return value


class ChatSessionListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for session lists."""
    course = CourseListSerializer(read_only=True)
    topic = TopicListSerializer(read_only=True)
    last_message = serializers.SerializerMethodField()
    
    class Meta:
        model = ChatSession
        fields = [
            'id', 'title', 'course', 'topic',
            'is_archived', 'is_pinned',
            'message_count', 'last_message_at',
            'last_message', 'created_at', 'updated_at',
        ]
    
    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-created_at').first()
        if last_msg:
            return {
                'id': str(last_msg.id),
                'role': last_msg.role,
                'content': last_msg.content[:100] + ('...' if len(last_msg.content) > 100 else ''),
                'created_at': last_msg.created_at,
            }
        return None


class ChatSessionDetailSerializer(serializers.ModelSerializer):
    """Full session detail with messages."""
    course = CourseListSerializer(read_only=True)
    topic = TopicListSerializer(read_only=True)
    messages = ChatMessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatSession
        fields = [
            'id', 'title', 'course', 'topic',
            'is_archived', 'is_pinned',
            'message_count', 'total_tokens_used',
            'messages', 'created_at', 'updated_at', 'last_message_at',
        ]
        read_only_fields = ['id', 'message_count', 'total_tokens_used', 'created_at', 'updated_at', 'last_message_at']


class ChatSessionCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new chat sessions."""
    
    class Meta:
        model = ChatSession
        fields = ['title', 'course', 'topic']
    
    # User is set by the view's perform_create method
    # which properly handles anonymous users


class ChatSessionUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating session metadata."""
    
    class Meta:
        model = ChatSession
        fields = ['title', 'is_archived', 'is_pinned', 'course', 'topic']


class SendMessageSerializer(serializers.Serializer):
    """Serializer for sending a message and getting AI response."""
    content = serializers.CharField(required=False, allow_blank=True)
    attachments = serializers.ListField(
        child=serializers.DictField(),
        required=False,
        default=list
    )
    regenerate = serializers.BooleanField(default=False)
    parent_message_id = serializers.UUIDField(required=False, allow_null=True)
    max_tokens = serializers.IntegerField(default=4096, min_value=100, max_value=8192)


class AIResponseSerializer(serializers.Serializer):
    """Serializer for AI response."""
    content = serializers.CharField()
    model_used = serializers.CharField()
    tokens_used = serializers.IntegerField()
    generation_time_ms = serializers.IntegerField()


class FeedbackSerializer(serializers.Serializer):
    """Serializer for message feedback."""
    is_helpful = serializers.BooleanField()
    feedback_text = serializers.CharField(required=False, allow_blank=True, max_length=500)


class ExportSessionSerializer(serializers.Serializer):
    """Serializer for export options."""
    format = serializers.ChoiceField(choices=['markdown', 'json', 'txt'], default='markdown')
    include_metadata = serializers.BooleanField(default=True)
    include_attachments = serializers.BooleanField(default=False)