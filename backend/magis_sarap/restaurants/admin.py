from django.contrib import admin
from .models import Restaurant, CuisineType

# Register your models here.
@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('resto_id', 'resto_name', 'get_owners', 'operating_hours', 'get_cuisine_types')

    def get_owners(self, obj):
        return ", ".join([owner.name for owner in obj.resto_owners.all()])
    get_owners.short_description = 'Owners'
    
    def get_cuisine_types(self, obj):
        return ", ".join([cuisine.type for cuisine in obj.cuisine_type.all()])
    get_cuisine_types.short_description = 'Cuisine Types'

@admin.register(CuisineType)
class CuisineAdmin(admin.ModelAdmin):
    list_display = ('type',)