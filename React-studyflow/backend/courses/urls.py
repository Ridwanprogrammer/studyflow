from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DisciplineViewSet,
    CourseViewSet,
    TopicViewSet,
    UserProgressViewSet,
    GlossaryTermViewSet,
)

router = DefaultRouter()
# Register specific prefixes before the empty course prefix so that
# /courses/topics/... and /courses/progress/... are not swallowed by the
# course detail route.
router.register(r'disciplines', DisciplineViewSet, basename='discipline')
router.register(r'topics', TopicViewSet, basename='topic')
router.register(r'progress', UserProgressViewSet, basename='progress')
router.register(r'glossary', GlossaryTermViewSet, basename='course-glossary')
router.register(r'', CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
]