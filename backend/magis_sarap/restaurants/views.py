from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import Restaurant, CuisineType
from .forms import CreateRestaurantForm
from .serializers import RestaurantSerializer, CuisineTypeSerializer

# Create your views here.
class CreateRestaurantView(CreateView):
    model = Restaurant
    template_name = 'create_restaurant.html'
    form_class = CreateRestaurantForm
    success_url = reverse_lazy(''); # CHANGE THIS TO ACTUAL REDIRECT URL

    def form_valid(self, form):
        resto_owner = self.request.session.get('resto_owner')
        resto_name = self.request.session.get('resto_name')

        if resto_owner:
            form.instance.resto_owner = resto_owner
        if resto_name:
            form.instance.resto_name = resto_name

        response = super().form_valid(form)

        cuisine_choices = self.request.POST.getlist('cuisine_type')
        cuisine_objects = CuisineType.objects.filter(type__in=cuisine_choices)
        self.object.cuisine_type.set(cuisine_objects)

        return response
    
class RestaurantDashboardView(APIView):
    def get(self, request, *args, **kwargs):
        # all restaurants
        restaurants = Restaurant.objects.all()
        restaurant_data = RestaurantSerializer(restaurants, many=True).data

        # all cuisine categories
        cuisines = CuisineType.objects.all()
        cuisine_data = CuisineTypeSerializer(cuisines, many=True).data

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