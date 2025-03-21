from django.urls import path
from .views import RestaurantDashboardView, get_restaurants
from . import views

app_name = "restaurants"

urlpatterns = [
    path('dashboard/', RestaurantDashboardView.as_view(), name='restaurant-dashboard'),
    path('', get_restaurants, name='restaurant-list'),
    path('<str:resto_name>/', views.RestaurantDetailView.as_view(), name='restaurant-detail'),
]