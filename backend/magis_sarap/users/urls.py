from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.CreateCustomerView.as_view(), name='customer-register'),
]