from django.contrib import admin
from .models import Restaurant

# Register your models here.
@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('resto_id', 'resto_name', 'resto_owner', 'operating_hours', 'cuisines')
    
    def get_cuisine_types(self, obj):
        return ", ".join([cuisine.type for cuisine in obj.cuisine_type.all()])
    get_cuisine_types.short_description = 'Cuisine Types'

# @admin.register(CuisineType)
# class CuisineAdmin(admin.ModelAdmin):
#     list_display = ('type',)