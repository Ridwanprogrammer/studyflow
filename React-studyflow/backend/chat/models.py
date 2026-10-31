from django.db import models
from django.conf import settings
from django.utils import timezone
import uuid


class ChatSession(models.Model):
    """Chat session model replacing localStorage."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='chat_sessions'
    )
    
    # Context
    course = models.ForeignKey(
        'courses.Course',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='chat_sessions'
    )
    topic = models.ForeignKey(
        'courses.Topic',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='chat_sessions'
    )
    
    # Session info
    title = models.CharField(max_length=200, default='New Study Chat')
    is_archived = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    
    # Metadata
    message_count = models.PositiveIntegerField(default=0)
    total_tokens_used = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_message_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-is_pinned', '-last_message_at', '-updated_at']
        verbose_name = 'Chat Session'
        verbose_name_plural = 'Chat Sessions'
        indexes = [
            models.Index(fields=['user', '-last_message_at']),
            models.Index(fields=['user', 'course', 'topic']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
    def update_last_message(self):
        self.last_message_at = timezone.now()
        self.message_count = self.messages.count()
        self.save(update_fields=['last_message_at', 'message_count', 'updated_at'])


class ChatMessage(models.Model):
    """Individual chat message within a session."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(
        ChatSession,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    
    # Message content
    role = models.CharField(max_length=20, choices=[
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ])
    content = models.TextField()
    
    # Attachments (JSON array)
    attachments = models.JSONField(default=list, blank=True)
    # [
    #   {"id": "...", "kind": "image|text", "name": "...", "type": "...", "size": 123, "dataUrl": "...", "text": "..."}
    # ]
    
    # AI metadata
    model_used = models.CharField(max_length=100, blank=True)
    tokens_used = models.PositiveIntegerField(default=0)
    generation_time_ms = models.PositiveIntegerField(default=0)
    is_regenerated = models.BooleanField(default=False)
    parent_message = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='regenerations'
    )
    
    # User feedback
    is_helpful = models.BooleanField(null=True, blank=True)
    feedback_text = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name = 'Chat Message'
        verbose_name_plural = 'Chat Messages'
        indexes = [
            models.Index(fields=['session', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.session.title} - {self.role}: {self.content[:50]}..."
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            self.session.update_last_message()


class AIUsageLog(models.Model):
    """Track AI API usage for analytics and rate limiting."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ai_usage_logs'
    )
    session = models.ForeignKey(
        ChatSession,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='usage_logs'
    )
    
    # Request details
    model = models.CharField(max_length=100)
    endpoint = models.CharField(max_length=200)
    prompt_tokens = models.PositiveIntegerField(default=0)
    completion_tokens = models.PositiveIntegerField(default=0)
    total_tokens = models.PositiveIntegerField(default=0)
    
    # Performance
    latency_ms = models.PositiveIntegerField(default=0)
    status_code = models.PositiveIntegerField()
    error_message = models.TextField(blank=True)
    
    # Context
    course = models.ForeignKey(
        'courses.Course',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    topic = models.ForeignKey(
        'courses.Topic',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'AI Usage Log'
        verbose_name_plural = 'AI Usage Logs'
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['session', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.model} - {self.total_tokens} tokens"