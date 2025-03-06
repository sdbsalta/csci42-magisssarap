from django.urls import path
from . import views

app_name = "restaurants"

urlpatterns = [
    path('create-restaurant/<str:resto_name>/', views.CreateRestaurantView.as_view(), name='create-restaurant'),
]