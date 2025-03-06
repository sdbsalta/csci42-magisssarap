from rest_framework import serializers
from .models import FoodItem

class FoodItemSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(source='restaurant.resto_name')

    class Meta:
        model = FoodItem
        fields = ['id', 'description', 'price', 'restaurant']  
