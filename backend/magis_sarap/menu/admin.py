from django.contrib import admin
from .models import FoodItem

# Register your models here.
@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ("restaurant", "item_no", "description", "price", "is_vegan", "is_halal")
    list_filter = ("restaurant",)
