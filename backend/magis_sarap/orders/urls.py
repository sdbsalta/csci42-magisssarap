from django.urls import path
from . import views
from .views import CartView, ApplyVoucherView

urlpatterns = [
    # CUSTOMER
    path("", views.OrderListCreateView.as_view(), name="order-list"),
    path("pending/", views.PendingOrderView.as_view(), name="order-pending"),
    path("cart/", CartView.as_view(), name="cart"),
    path("apply-voucher/", ApplyVoucherView.as_view(), name="apply-voucher"),

    # RESTAURANT
    path("active-orders/", views.ActiveOrdersRestoView.as_view(), name="order-active"),
    path("past-orders/", views.PastOrdersRestoView.as_view(), name="order-past"),
    path("order-detail/<str:order_id>/", views.OrderDetailRestoView.as_view(), name="order-detail-resto"),

    # WHAT IS THIS FOR? -czy
    path("<str:order_id>/", views.OrderDetailView.as_view(), name="order-detail"),
]


# Modify urls later so that we can distinguish between resto record and customer order history