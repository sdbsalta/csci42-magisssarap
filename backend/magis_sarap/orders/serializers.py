from .models import Order, OrderItem, Delivery
from rest_framework import serializers

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['delivery_location', 'status', 'estimated_time', 'delivered_at']

class OrderItemSerializer(serializers.ModelSerializer):
    food_item_name = serializers.CharField(source='food_item.name', read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'food_item', 'quantity', 'price', 'food_item_name']

class OrderSerializer(serializers.ModelSerializer):
    order_id = serializers.CharField(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')  # corrected FK relationship
    restaurant_name = serializers.CharField(source="restaurant.resto_name", read_only=True)  # get restaurant name
    delivery = DeliverySerializer(read_only=True)  # Include delivery info here
    customer_phone = serializers.CharField(source='customer.contact_no', read_only=True)  # Get customer's contact number

    class Meta:
        model = Order
        fields = [
            'order_id', 'customer', 'customer_phone', 'restaurant', 'restaurant_name', 'voucher_code',
            'status', 'total_price', 'date_created', 'time_completed', 'items', 'notes', 'delivery'
        ]

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['delivery_location', 'status', 'estimated_time', 'delivered_at']