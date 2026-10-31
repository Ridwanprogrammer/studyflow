from django.db import models
from django.conf import settings
from django.utils.text import slugify


class Discipline(models.Model):
    """Academic discipline/category for courses."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True)  # emoji or icon class
    color = models.CharField(max_length=7, default='#06b6d4')  # hex color
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Disciplines'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Course(models.Model):
    """Course model matching the current frontend structure."""
    code = models.CharField(max_length=20, unique=True)  # COS201, MTH201
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    discipline = models.ForeignKey(
        Discipline,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='courses'
    )
    
    # Metadata
    level = models.CharField(max_length=50, blank=True)  # e.g., "200L"
    semester = models.CharField(max_length=50, blank=True)  # e.g., "2nd Semester"
    credits = models.PositiveIntegerField(default=3)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'code']
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
    
    def __str__(self):
        return f"{self.code}: {self.title}"


class Topic(models.Model):
    """Topic model matching the current frontend structure."""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='topics')
    topic_id = models.CharField(max_length=50)  # cos201-t1, mth201-t1
    title = models.CharField(max_length=200)
    notes = models.TextField(blank=True)  # Full markdown notes
    
    # Learning guide structure (JSON)
    learning_guide = models.JSONField(default=dict, blank=True)
    # {
    #   "why": "...",
    #   "mentalModel": "...",
    #   "plainExplanation": "...",
    #   "misconception": "...",
    #   "check": "..."
    # }
    
    # Metadata
    order = models.PositiveIntegerField(default=0)
    estimated_read_time = models.PositiveIntegerField(default=0)  # minutes
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['course', 'order']
        unique_together = ['course', 'topic_id']
        verbose_name = 'Topic'
        verbose_name_plural = 'Topics'
    
    def __str__(self):
        return f"{self.course.code} - {self.title}"
    
    @property
    def full_id(self):
        return f"{self.course.code.lower()}-{self.topic_id}"


class UserProgress(models.Model):
    """Track user progress through topics."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='topic_progress')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='user_progress')
    
    # Progress tracking
    is_completed = models.BooleanField(default=False)
    completion_percentage = models.PositiveIntegerField(default=0)  # 0-100
    time_spent = models.PositiveIntegerField(default=0)  # seconds
    
    # Bookmarking
    is_bookmarked = models.BooleanField(default=False)
    bookmarked_at = models.DateTimeField(null=True, blank=True)
    
    # Notes
    personal_notes = models.TextField(blank=True)
    
    # Timestamps
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'topic']
        verbose_name = 'User Progress'
        verbose_name_plural = 'User Progress'
    
    def __str__(self):
        return f"{self.user.username} - {self.topic.title}: {self.completion_percentage}%"


class GlossaryTerm(models.Model):
    """Glossary terms for the global glossary feature."""
    term = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    
    # Content
    short_definition = models.TextField(help_text="Brief one-sentence definition")
    full_definition = models.TextField(help_text="Detailed explanation in markdown")
    formal_definition = models.TextField(blank=True, help_text="LaTeX/mathematical formal definition")
    
    # Categorization
    discipline = models.ForeignKey(Discipline, on_delete=models.SET_NULL, null=True, blank=True, related_name='glossary_terms')
    category = models.CharField(max_length=100, blank=True)  # e.g., "Calculus", "Algorithms"
    related_courses = models.ManyToManyField(Course, blank=True, related_name='glossary_terms')
    related_topics = models.ManyToManyField(Topic, blank=True, related_name='glossary_terms')
    
    # Related terms (for "Related Terminology" section)
    related_terms = models.ManyToManyField('self', blank=True, symmetrical=False)
    
    # Worked examples (JSON array)
    worked_examples = models.JSONField(default=list, blank=True)
    # [
    #   {"title": "...", "problem": "...", "solution": "...", "explanation": "..."}
    # ]
    
    # Metadata
    difficulty = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ], default='beginner')
    is_featured = models.BooleanField(default=False)
    view_count = models.PositiveIntegerField(default=0)
    
    # User interactions
    bookmarked_by = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='bookmarked_terms')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_terms')
    
    class Meta:
        unique_together = ['discipline', 'slug']
        ordering = ['discipline', 'term']
        verbose_name = 'Glossary Term'
        verbose_name_plural = 'Glossary Terms'
        indexes = [
            models.Index(fields=['discipline', 'term']),
            models.Index(fields=['term']),
        ]
    
    def __str__(self):
        return self.term
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.term)
        super().save(*args, **kwargs)