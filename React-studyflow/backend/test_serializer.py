import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from core.serializers import CustomTokenObtainPairSerializer

# Test the serializer
serializer = CustomTokenObtainPairSerializer(data={'email': 'admin@studyflow.local', 'password': 'admin123'})
if serializer.is_valid():
    print('Serializer valid:', serializer.validated_data)
else:
    print('Serializer errors:', serializer.errors)