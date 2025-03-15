from rest_framework import serializers
from .models import Restaurant, CuisineType

class CuisineTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuisineType
        fields = ["id", "type"]

class RestaurantSerializer(serializers.ModelSerializer):
    cuisine_types = CuisineTypeSerializer(many=True, source="cuisine_type")

    class Meta:
        model = Restaurant
        fields = ["resto_id", "resto_name", "location", "image", "cuisine_types", "description"]
