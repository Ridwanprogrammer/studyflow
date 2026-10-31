from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'daily_goal_minutes', 'profile_public', 'email_notifications']
    search_fields = ['user__username', 'user__email']


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'university', 'level', 'is_staff', 'created_at']
    list_filter = ['is_staff', 'is_superuser', 'is_active', 'university', 'level', 'theme']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'university', 'department']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at', 'last_active', 'last_login', 'date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile', {
            'fields': ('avatar', 'university', 'department', 'level', 'bio', 'theme', 'preferred_courses')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'last_active'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Profile', {
            'fields': ('email', 'first_name', 'last_name', 'university', 'department', 'level')
        }),
    )
    
    inlines = [UserProfileInline]