from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, RestaurantOwner

@admin.register(User)
class UserAdmin(BaseUserAdmin): 
    list_display = ('user_id', 'name', 'user_type', 'email_address', 'is_active')
    search_fields = ('user_id', 'name', 'email_address')
    ordering = ('user_id',)
    fieldsets = (
        (None, {'fields': ('user_id', 'name', 'email_address', 'contact_no', 'user_type', 'password', 'is_active')}),
    )
    add_fieldsets = (
        (None, {'fields': ('user_id', 'name', 'email_address', 'contact_no', 'user_type', 'password1', 'password2', 'is_active')}),
    )

