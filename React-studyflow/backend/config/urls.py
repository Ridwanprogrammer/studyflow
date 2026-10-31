"""
URL configuration for StudyFlow project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.views.generic import RedirectView

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request, format=None):
    """API root endpoint listing all available endpoints."""
    return Response({
        'authentication': {
            'token_obtain': reverse('token_obtain_pair', request=request, format=format),
            'token_refresh': reverse('token_refresh', request=request, format=format),
            'token_verify': reverse('token_verify', request=request, format=format),
            'register': reverse('register', request=request, format=format),
            'login': reverse('login', request=request, format=format),
        },
        'users': reverse('user-list', request=request, format=format),
        'courses': reverse('course-list', request=request, format=format),
        'chat': reverse('chat-session-list', request=request, format=format),
        'glossary': reverse('glossary-list', request=request, format=format),
    })

urlpatterns = [
    # Root redirect to API root
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    
    # API Root
    path('api/', api_root, name='api-root'),
    
    # Admin
    path('admin/', admin.site.urls),
    
    # Authentication (JWT)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # API Apps
    path('api/users/', include('core.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/chat/', include('chat.urls')),
    path('api/glossary/', include('glossary.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)