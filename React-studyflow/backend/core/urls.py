from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationView, UserViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('', include(router.urls)),
]