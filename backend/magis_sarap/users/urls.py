from django.urls import path
from . import views

urlpatterns = [
    path('customer-register/', views.CreateCustomerView.as_view(), name='customer-register'),
     path('restaurant-owner-register/', views.CreateRestaurantOwnerView.as_view(), name='restaurant-owner-register'),
]

app_name = "users"