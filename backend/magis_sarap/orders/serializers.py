from .models import Order, OrderItem, Delivery
from rest_framework import serializers

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['delivery_location', 'status', 'estimated_time', 'delivered_at']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'food_item', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    order_id = serializers.CharField(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')  # corrected FK relationship
    restaurant_name = serializers.CharField(source="restaurant.resto_name", read_only=True)  # get restaurant name
    delivery = DeliverySerializer(read_only=True)  # Include delivery info here

    class Meta:
        model = Order
        fields = [
            'order_id', 'customer', 'restaurant', 'restaurant_name', 'voucher_code',
            'status', 'total_price', 'date_created', 'time_completed', 'items', 'notes', 'delivery'
        ]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'restaurant', 'rating', 'comment', 'created_at']