from django.urls import path
from .views import FoodItemListView

urlpatterns = [
    path("fooditems/", FoodItemListView.as_view(), name="fooditem-list"),  
]
