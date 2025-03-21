from django.urls import path
from .views import FoodItemListView, FoodItemCreateView, MenuItemsByRestaurantView, RestaurantMenuView

# path("api/", include("menu.urls")),
urlpatterns = [
    path("food-items/", FoodItemListView.as_view(), name="fooditem-list"),
    path('<str:resto_name>/menu/', MenuItemsByRestaurantView.as_view(), name='get-menu-items'),

    path("add-food-item/", FoodItemCreateView.as_view(), name="fooditem-create"), 
    path("restaurant/<int:resto_id>/menu/", RestaurantMenuView.as_view(), name="restaurant-menu"),
]