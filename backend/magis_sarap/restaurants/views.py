from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import Restaurant
from .serializers import RestaurantSerializer
import json

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_restaurants(request):
    restaurants = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data)

class RestaurantDetailView(APIView):
    def get(self, request, resto_name, *args, **kwargs):
        # Replace hyphens with spaces to match the restaurant name
        resto_name = resto_name.replace('-', ' ')

        try:
            # Use case-insensitive lookup for restaurant name
            restaurant = Restaurant.objects.get(resto_name__iexact=resto_name)
            # Serialize the restaurant data
            restaurant_data = RestaurantSerializer(restaurant).data
            return Response(restaurant_data, status=status.HTTP_200_OK)
        except Restaurant.DoesNotExist:
            return Response({"detail": "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)

# class CreateRestaurantView(CreateView):
#     model = Restaurant
#     template_name = 'create_restaurant.html'
#     success_url = reverse_lazy(''); # CHANGE THIS TO ACTUAL REDIRECT URL

#     def form_valid(self, form):
#         resto_owner = self.request.session.get('resto_owner')
#         resto_name = self.request.session.get('resto_name')

#         if resto_owner:
#             form.instance.resto_owner = resto_owner
#         if resto_name:
#             form.instance.resto_name = resto_name

#         response = super().form_valid(form)

#         # Get the cuisine choices and store them as JSON
#         cuisine_choices = self.request.POST.getlist('cuisine_type')
#         self.object.cuisines = json.dumps(cuisine_choices)
#         self.object.save()

#         return response
    
class RestaurantDashboardView(APIView):
    def get(self, request, *args, **kwargs):
        # all restaurants
        restaurants = Restaurant.objects.all()
        restaurant_data = RestaurantSerializer(restaurants, many=True).data

        # Get unique cuisines from all restaurants
        all_cuisines = set()
        for restaurant in restaurants:
            cuisines = json.loads(restaurant.cuisines)
            all_cuisines.update(cuisines)
        
        # Convert to list and sort
        cuisine_data = [{"type": cuisine} for cuisine in sorted(all_cuisines)]

        # navigation links
        navigation_links = {
            "home": "/home/",
            "search_categories": "/categories/",
            "my_orders": "/orders/",
            "cart": "/cart/",
            "my_account": "/account/",
            "logout": "/logout/"
        }

        # combines data into a single response
        response_data = {
            "restaurants": restaurant_data,
            "categories": cuisine_data,
            "navigation": navigation_links
        }

        return Response(response_data, status=status.HTTP_200_OK)