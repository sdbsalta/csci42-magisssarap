from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import FoodItem
from .serializers import FoodItemListSerializer, FoodItemCreateSerializer, MenuItemSerializer
from restaurants.models import Restaurant
from orders.models import Review
from orders.serializers import ReviewSerializer
from django.utils import timezone

class FoodItemListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemListSerializer

class FoodItemCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]  # Temporarily allow any user to access this view
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemCreateSerializer

    def perform_create(self, serializer):
        # Get or create a default restaurant
        default_restaurant, created = Restaurant.objects.get_or_create(
            resto_name="Sample Restaurant",
            defaults={
                'resto_owner': 'Sample Owner',
                'opening_time': timezone.now().time(),
                'closing_time': timezone.now().time(),
                'cuisines': '[]'
            }
        )
        
        # Save the food item with the default restaurant
        serializer.save(restaurant=default_restaurant)
        
class RestaurantMenuView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    
    def get(self, request, resto_id, *args, **kwargs):
        restaurant = get_object_or_404(Restaurant, resto_id=resto_id)
        food_items = FoodItem.objects.filter(restaurant=restaurant)
        reviews = Review.objects.filter(restaurant=restaurant)

        food_items_data = FoodItemListSerializer(food_items, many=True).data
        reviews_data = ReviewSerializer(reviews, many=True).data

        return Response({
            "restaurant": restaurant.resto_name,
            "food_items": food_items_data,
            "reviews": reviews_data
        })
        
class MenuItemsByRestaurantView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        resto_name = self.kwargs.get("resto_name")  # Get the restaurant name from the URL
        resto_name_cleaned = resto_name.replace("-", " ")
        print(f"Converted to: {resto_name_cleaned}")  # Debug processed name

        restaurant = Restaurant.objects.filter(resto_name__iexact=resto_name_cleaned).first()

        if restaurant:
            print(f"Found restaurant: {restaurant.resto_name}")
        else:
            print("No restaurant found!")


        return FoodItem.objects.filter(restaurant=restaurant)

