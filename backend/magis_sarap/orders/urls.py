from django.urls import path
from . import views

urlpatterns = [
    path("", views.OrderListCreateView.as_view(), name="order-list"),
    path("<str:order_id>/", views.OrderDetailView.as_view(), name="order-detail"),
    path("pending/", views.PendingOrderView.as_view(), name="order-pending"),
]
