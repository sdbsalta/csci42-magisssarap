from rest_framework import serializers
from .models import Restaurant
import json


class RestaurantSerializer(serializers.ModelSerializer):
    cuisines = serializers.SerializerMethodField()

    def get_cuisines(self, obj):
        return json.loads(obj.cuisines)

    class Meta:
        model = Restaurant
        fields = ["resto_id", "resto_name", "location", "image", "cuisines", "description"]
