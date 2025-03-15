from rest_framework import serializers
from .models import Order, OrderItem
from restaurants.models import Restaurant 

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'food_item', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    order_id = serializers.CharField(read_only=True) 
    items = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')  # corrected FK relationship
    restaurant_name = serializers.CharField(source="restaurant.resto_name", read_only=True)  # get restaurant name

    class Meta:
        model = Order
        fields = [
            'order_id', 'customer', 'restaurant', 'restaurant_name', 
            'status', 'total_price', 'date_created', 'time_completed', 'items'
        ]