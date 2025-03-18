from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import FoodItem
from .serializers import FoodItemListSerializer, FoodItemCreateSerializer
from restaurants.models import Restaurant
from django.utils import timezone

class FoodItemListView(generics.ListAPIView):
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