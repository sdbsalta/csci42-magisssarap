from django.urls import path
from . import views

urlpatterns = [
    path("", views.OrderListCreateView.as_view(), name="order-list"),  # This will handle /orders/?status=active
    path("order-history/", views.OrderListCreateView.as_view(), name="order-list"),
    path("pending/", views.PendingOrderView.as_view(), name="order-pending"),
    path("active-orders/", views.ActiveOrdersRestoView.as_view(), name="order-active"),
    path("past-orders/", views.PastOrdersRestoView.as_view(), name="order-past"),
    path("order-detail/<str:order_id>/", views.OrderDetailRestoView.as_view(), name="order-detail-resto"),
    path("<str:order_id>/", views.OrderDetailView.as_view(), name="order-detail"),
]


# Modify urls later so that we can distinguish between resto record and customer order history