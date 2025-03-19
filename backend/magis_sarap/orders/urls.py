from django.urls import path
from . import views
from .views import CartView, ApplyVoucherView

urlpatterns = [
    path("", views.OrderListCreateView.as_view(), name="order-list"),
    path("<str:order_id>/", views.OrderDetailView.as_view(), name="order-detail"),
    path("pending/", views.PendingOrderView.as_view(), name="order-pending"),
    path("cart/", CartView.as_view(), name="cart"),
    path("apply-voucher/", ApplyVoucherView.as_view(), name="apply-voucher"),
]
