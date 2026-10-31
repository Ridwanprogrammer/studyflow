"""
Development settings for StudyFlow project.
"""
from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# Email backend for development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Disable password validators in development for easier testing
AUTH_PASSWORD_VALIDATORS = []

# CORS - allow all in development
CORS_ALLOW_ALL_ORIGINS = True