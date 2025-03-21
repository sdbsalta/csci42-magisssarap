from django.urls import path
from .views import FoodItemListView, FoodItemCreateView, RestaurantMenuView

# path("api/", include("menu.urls")),
urlpatterns = [
    path("food-items/", FoodItemListView.as_view(), name="fooditem-list"),
    path("add-food-item/", FoodItemCreateView.as_view(), name="fooditem-create"), 
    path("restaurant/<int:resto_id>/menu/", RestaurantMenuView.as_view(), name="restaurant-menu"),
]