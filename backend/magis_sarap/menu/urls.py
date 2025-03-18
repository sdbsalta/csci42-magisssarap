from django.urls import path
from .views import FoodItemListView, FoodItemCreateView

urlpatterns = [
    path("food-items/", FoodItemListView.as_view(), name="fooditem-list"),
    path("add-food-item/", FoodItemCreateView.as_view(), name="fooditem-create"), 
]