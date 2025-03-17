from django.urls import path
from .views import register_customer, register_restaurant_owner, login_user, logout_user, get_logged_in_user, user_detail

urlpatterns = [
    path("api/signup/", register_customer, name="register_customer"),
    path("api/register_restaurant_owner/", register_restaurant_owner, name="register_restaurant_owner"),
    path('api/login/', login_user, name='login'),
    path('api/logout/', logout_user, name='logout'),
    path('api/user/', get_logged_in_user, name='get_logged_in_user'),
    path('api/user/<int:user_id>/', user_detail, name='user-detail'),
]

app_name = "users"