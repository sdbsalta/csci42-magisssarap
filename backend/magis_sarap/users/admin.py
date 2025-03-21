from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, RestaurantOwner


@admin.register(User)
class UserAdmin(BaseUserAdmin): 
    list_display = ('id', 'name', 'user_type', 'email_address', 'is_active')
    search_fields = ('id', 'name', 'email_address')
    ordering = ('id',)
    fieldsets = (
        (None, {'fields': ('id', 'name', 'email_address', 'contact_no', 'user_type', 'password', 'is_active')}),
    )
    add_fieldsets = (
        (None, {'fields': ('id', 'name', 'email_address', 'contact_no', 'user_type', 'password1', 'password2', 'is_active')}),
    )

@admin.register(RestaurantOwner)
class RestaurantOwnerAdmin(BaseUserAdmin): 
    list_display = ('id', 'name', 'resto_name')
    ordering = ('id',)
