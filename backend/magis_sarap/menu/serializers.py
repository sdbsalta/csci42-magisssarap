from rest_framework import serializers
from .models import FoodItem

class FoodItemListSerializer(serializers.ModelSerializer):
    resto_name = serializers.CharField(source='restaurant.resto_name')

    class Meta:
        model = FoodItem
        fields = ['id', 'description', 'price', 'resto_name']

class FoodItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodItem
        fields = [
            'id',
            'name', 
            'item_no', 
            'restaurant', 
            'description', 
            'is_vegan', 
            'is_halal', 
            'calories', 
            'price', 
            'food_image'
        ]
        read_only_fields = ['item_no', 'restaurant']

    def create(self, validated_data):
        return FoodItem.objects.create(**validated_data)
    
class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__' #ill fix this pa