from django.contrib import admin
from .models import Discipline, Course, Topic, UserProgress, GlossaryTerm


@admin.register(Discipline)
class DisciplineAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'color', 'order', 'is_active', 'course_count']
    list_editable = ['order', 'is_active']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    
    def course_count(self, obj):
        return obj.courses.count()
    course_count.short_description = 'Courses'


class TopicInline(admin.TabularInline):
    model = Topic
    extra = 1
    fields = ['topic_id', 'title', 'order', 'estimated_read_time', 'is_active']
    ordering = ['order']
    show_change_link = True


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'title', 'discipline', 'level', 'semester', 'credits', 'order', 'is_active', 'topic_count']
    list_filter = ['discipline', 'level', 'semester', 'is_active']
    search_fields = ['code', 'title', 'description']
    list_editable = ['order', 'is_active']
    prepopulated_fields = {}
    inlines = [TopicInline]
    
    def topic_count(self, obj):
        return obj.topics.count()
    topic_count.short_description = 'Topics'


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['course', 'topic_id', 'title', 'order', 'estimated_read_time', 'is_active']
    list_filter = ['course', 'course__discipline', 'is_active']
    search_fields = ['title', 'notes', 'topic_id']
    list_editable = ['order', 'is_active']
    raw_id_fields = ['course']
    fieldsets = (
        ('Basic Info', {
            'fields': ('course', 'topic_id', 'title', 'order', 'estimated_read_time', 'is_active')
        }),
        ('Content', {
            'fields': ('notes', 'learning_guide'),
            'classes': ('wide',)
        }),
    )


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'topic', 'is_completed', 'completion_percentage', 'is_bookmarked', 'updated_at']
    list_filter = ['is_completed', 'is_bookmarked', 'topic__course']
    search_fields = ['user__username', 'topic__title']
    raw_id_fields = ['user', 'topic']
    readonly_fields = ['started_at', 'completed_at', 'updated_at']


@admin.register(GlossaryTerm)
class GlossaryTermAdmin(admin.ModelAdmin):
    list_display = ['term', 'discipline', 'category', 'difficulty', 'is_featured', 'view_count', 'bookmark_count']
    list_filter = ['discipline', 'category', 'difficulty', 'is_featured']
    search_fields = ['term', 'short_definition', 'full_definition']
    prepopulated_fields = {'slug': ('term',)}
    filter_horizontal = ['related_courses', 'related_topics', 'related_terms', 'bookmarked_by']
    raw_id_fields = ['created_by']
    readonly_fields = ['view_count', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Info', {
            'fields': ('term', 'slug', 'discipline', 'category', 'difficulty', 'is_featured')
        }),
        ('Definitions', {
            'fields': ('short_definition', 'full_definition', 'formal_definition'),
            'classes': ('wide',)
        }),
        ('Relationships', {
            'fields': ('related_courses', 'related_topics', 'related_terms'),
            'classes': ('collapse',)
        }),
        ('Examples', {
            'fields': ('worked_examples',),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('view_count', 'created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def bookmark_count(self, obj):
        return obj.bookmarked_by.count()
    bookmark_count.short_description = 'Bookmarks'