from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GlossaryViewSet

router = DefaultRouter()
router.register(r'', GlossaryViewSet, basename='glossary')

urlpatterns = [
    path('', include(router.urls)),
]