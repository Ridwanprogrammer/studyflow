from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Custom user model for StudyFlow.
    Extends AbstractUser to add profile fields.
    """
    email = models.EmailField(_('email address'), unique=True)
    
    # Profile fields
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    university = models.CharField(max_length=200, blank=True)
    department = models.CharField(max_length=200, blank=True)
    level = models.CharField(max_length=50, blank=True)  # e.g., "200L"
    bio = models.TextField(blank=True)
    
    # Preferences
    preferred_courses = models.ManyToManyField(
        'courses.Course',
        blank=True,
        related_name='subscribed_users'
    )
    theme = models.CharField(max_length=20, default='dark', choices=[
        ('light', 'Light'),
        ('dark', 'Dark'),
        ('system', 'System'),
    ])
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_active = models.DateTimeField(default=timezone.now)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        db_table = 'users'
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.username} ({self.email})"
    
    @property
    def full_name_or_username(self):
        return self.get_full_name() or self.username
    
    def update_last_active(self):
        self.last_active = timezone.now()
        self.save(update_fields=['last_active'])


class UserProfile(models.Model):
    """
    Extended profile information for users.
    Kept separate for potential future expansion.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Study preferences
    study_reminder_enabled = models.BooleanField(default=False)
    study_reminder_time = models.TimeField(null=True, blank=True)
    daily_goal_minutes = models.PositiveIntegerField(default=30)
    
    # Privacy
    profile_public = models.BooleanField(default=False)
    show_progress = models.BooleanField(default=True)
    
    # Notification preferences
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"Profile for {self.user.username}"