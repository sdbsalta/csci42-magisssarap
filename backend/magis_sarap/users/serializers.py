from rest_framework import serializers
from .models import User

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_type"]  