from django.urls import path
from .views import register_customer, register_restaurant_owner, login_user, logout_user

urlpatterns = [
    path("signup/", register_customer, name="register_customer"),
    path("api/register_restaurant_owner/", register_restaurant_owner, name="register_restaurant_owner"),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
]

app_name = "users"