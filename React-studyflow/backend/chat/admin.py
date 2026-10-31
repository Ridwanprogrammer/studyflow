from django.contrib import admin
from .models import ChatSession, ChatMessage, AIUsageLog


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title', 'course', 'topic', 'message_count', 'is_archived', 'is_pinned', 'last_message_at', 'created_at']
    list_filter = ['is_archived', 'is_pinned', 'course', 'topic', 'created_at']
    search_fields = ['title', 'user__username', 'user__email']
    raw_id_fields = ['user', 'course', 'topic']
    readonly_fields = ['id', 'message_count', 'total_tokens_used', 'created_at', 'updated_at', 'last_message_at']
    date_hierarchy = 'created_at'
    ordering = ['-last_message_at', '-created_at']


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'session', 'role', 'content_preview', 'model_used', 'tokens_used', 'is_regenerated', 'created_at']
    list_filter = ['role', 'model_used', 'is_regenerated', 'is_helpful', 'created_at']
    search_fields = ['content', 'session__title', 'session__user__username']
    raw_id_fields = ['session', 'parent_message']
    readonly_fields = ['id', 'model_used', 'tokens_used', 'generation_time_ms', 'is_regenerated', 'parent_message', 'created_at']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    def content_preview(self, obj):
        return obj.content[:100] + ('...' if len(obj.content) > 100 else '')
    content_preview.short_description = 'Content'


@admin.register(AIUsageLog)
class AIUsageLogAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'model', 'total_tokens', 'latency_ms', 'status_code', 'course', 'topic', 'created_at']
    list_filter = ['model', 'status_code', 'course', 'topic', 'created_at']
    search_fields = ['user__username', 'error_message']
    raw_id_fields = ['user', 'session', 'course', 'topic']
    readonly_fields = ['id', 'created_at']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']