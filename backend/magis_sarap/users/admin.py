from django.contrib import admin
from .models import User, RestaurantOwner

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'name', 'user_type')

@admin.register(RestaurantOwner)
class RestaurantOwnerAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'name', 'resto_name',)