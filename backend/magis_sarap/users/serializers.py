from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'contact_no', 'email_address', 'user_type']

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4) 

    class Meta:
        model = User
        fields = ['id', 'name', 'contact_no', 'email_address', 'password', 'user_type']

    def validate_email_address(self, value):
        """Check if email exists before creating the user."""
        if User.objects.filter(email_address=value).exists():
            raise serializers.ValidationError("This Ateneo Student email has already been registered.")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # Hash password
        return User.objects.create(**validated_data)
    

