from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    register_customer, 
    register_restaurant_owner, 
    login_user, 
    logout_user, 
    get_logged_in_user, 
    user_detail, 
    VoucherViewSet
)

# Create a router and register the VoucherViewSet
router = DefaultRouter()
router.register(r'vouchers', VoucherViewSet, basename='voucher')

# Define URL patterns
urlpatterns = [
    path("api/signup/", register_customer, name="register_customer"),
    path("api/register_restaurant_owner/", register_restaurant_owner, name="register_restaurant_owner"),
    path('api/login/', login_user, name='login'),
    path('api/logout/', logout_user, name='logout'),
    path('api/user/', get_logged_in_user, name='get_logged_in_user'),
    path('api/user/<int:id>/', user_detail, name='user-detail'),

    # Include the router URLs
    path("api/", include(router.urls)),  # <-- This includes the registered endpoints
]

app_name = "users"
