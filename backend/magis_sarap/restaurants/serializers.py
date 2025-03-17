from rest_framework import serializers
from .models import Restaurant
import json

# class CuisineTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CuisineType
#         fields = ["id", "type"]

class RestaurantSerializer(serializers.ModelSerializer):
    # cuisine_types = CuisineTypeSerializer(many=True, source="cuisine_type")
    cuisines = serializers.SerializerMethodField()

    def get_cuisines(self, obj):
        return json.loads(obj.cuisines)

    class Meta:
        model = Restaurant
        fields = ["resto_id", "resto_name", "location", "image", "cuisines", "description"]
