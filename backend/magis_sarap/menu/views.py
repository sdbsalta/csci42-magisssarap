from django.shortcuts import render
from rest_framework import generics
from .models import FoodItem
from .serializers import FoodItemListSerializer, FoodItemCreateSerializer

class FoodItemListView(generics.ListAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemListSerializer

class FoodItemCreateView(generics.CreateAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemCreateSerializer

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'restaurantowner'):
            restaurant = self.request.user.restaurantowner.restaurant
            if serializer.is_valid():
                serializer.save(restaurant=restaurant)