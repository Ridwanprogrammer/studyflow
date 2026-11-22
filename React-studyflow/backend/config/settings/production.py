"""
Production settings for StudyFlow project - Render + Neon Optimized.
"""
import os
import dj_database_url
from .base import *

# =============================================================================
# SECURITY SETTINGS
# =============================================================================
DEBUG = False

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    raise ValueError("DJANGO_SECRET_KEY environment variable is required in production")

# Render provides *.onrender.com domains
# Allow Render subdomains + custom domains + Netlify frontend
ALLOWED_HOSTS = [
    '.onrender.com',          # All Render subdomains
    'localhost',
    '127.0.0.1',
] + [h.strip() for h in os.environ.get('ALLOWED_HOSTS', '').split(',') if h.strip()]

# Security headers (Render terminates SSL at load balancer)
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# =============================================================================
# DATABASE - Neon PostgreSQL (or any PostgreSQL via DATABASE_URL)
# =============================================================================
# Neon provides DATABASE_URL (postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require)
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=60,
        conn_health_checks=True,
        ssl_require=True,  # Neon requires SSL
    )
}

# =============================================================================
# STATIC FILES - WhiteNoise
# =============================================================================
# Insert WhiteNoise middleware right after SecurityMiddleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← Added for static files
] + [m for m in MIDDLEWARE if m not in [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
]]

# WhiteNoise configuration
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
WHITENOISE_USE_FINDERS = True
WHITENOISE_MANIFEST_STRICT = False
WHITENOISE_ALLOW_ALL_ORIGINS = True

# =============================================================================
# CORS - Frontend on Netlify
# =============================================================================
# Netlify gives frontend a domain like: studyflow-frontend.netlify.app
# Origins must be scheme + host with no path or trailing slash (corsheaders.E014).
CORS_ALLOWED_ORIGINS = [
    origin.strip().rstrip('/')
    for origin in (
        [
            'https://peaceful-eclair-485bef.netlify.app',  # Live Netlify site
            'https://studyflow-frontend.netlify.app',      # Friendly renamed site
        ]
        + os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')
    )
    if origin.strip()
]

CORS_ALLOW_CREDENTIALS = True

# =============================================================================
# CACHING - Redis (optional - Render has Redis addon, or use Upstash)
# =============================================================================
REDIS_URL = os.environ.get('REDIS_URL') or os.environ.get('UPSTASH_REDIS_URL')
if REDIS_URL:
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': REDIS_URL,
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            }
        }
    }
    RATELIMIT_USE_CACHE = 'default'

# =============================================================================
# LOGGING - Structured for Render logs
# =============================================================================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'json': {
            'format': '{"time": "%(asctime)s", "level": "%(levelname)s", "logger": "%(name)s", "message": "%(message)s"}',
            'datefmt': '%Y-%m-%dT%H:%M:%S',
        },
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'json',  # JSON logs for Render log aggregation
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'chat': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

# =============================================================================
# NVIDIA API SETTINGS
# =============================================================================
NVIDIA_API_KEY = os.environ.get('NVIDIA_API_KEY', '')
NVIDIA_BASE_URL = os.environ.get('NVIDIA_BASE_URL', 'https://integrate.api.nvidia.com/v1')
NVIDIA_MODEL_NAME = os.environ.get('NVIDIA_MODEL_NAME', 'google/gemma-4-31b-it')
NVIDIA_MODEL_FALLBACKS = os.environ.get('NVIDIA_MODEL_FALLBACKS', 'meta/llama-3.1-8b-instruct').split(',')
NVIDIA_REQUEST_TIMEOUT = int(os.environ.get('NVIDIA_REQUEST_TIMEOUT', '120'))

# =============================================================================
# EMAIL (Optional - for password reset, etc.)
# =============================================================================
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = os.environ.get('EMAIL_HOST', '')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True').lower() == 'true'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'StudyFlow <noreply@studyflow.local>')

# =============================================================================
# CSRF TRUSTED ORIGINS (for Django admin, forms)
# =============================================================================
CSRF_TRUSTED_ORIGINS = [
    'https://*.onrender.com',
    'https://peaceful-eclair-485bef.netlify.app',
    'https://studyflow-frontend.netlify.app',
] + [
    o.strip().rstrip('/') for o in os.environ.get('CSRF_TRUSTED_ORIGINS', '').split(',')
    if o.strip()
]