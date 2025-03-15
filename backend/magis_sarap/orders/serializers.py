from rest_framework import serializers
from .models import Order, OrderItem
from restaurants.models import Restaurant 

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'food_item', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    restaurant_name = serializers.CharField(source="restaurant.resto_name", read_only=True)  # for resto name

    class Meta:
        model = Order
        fields = ['id', 'customer', 'restaurant', 'restaurant_name', 'status', 'total_price', 'date_created', 'time_completed', 'items']
