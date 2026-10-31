from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'study_reminder_enabled', 'study_reminder_time', 'daily_goal_minutes',
            'profile_public', 'show_progress',
            'email_notifications', 'push_notifications',
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'full_name',
            'avatar', 'university', 'department', 'level', 'bio',
            'theme', 'preferred_courses', 'created_at', 'last_active',
            'profile',
        ]
        read_only_fields = ['id', 'created_at', 'last_active']
    
    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        if profile_data:
            profile, _ = UserProfile.objects.get_or_create(user=instance)
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    new_password_confirm = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({'new_password_confirm': 'Passwords do not match.'})
        return attrs
    
    def save(self, **kwargs):
        user = self.context['request'].user
        if not user.check_password(self.validated_data['old_password']):
            raise serializers.ValidationError({'old_password': 'Current password is incorrect.'})
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user