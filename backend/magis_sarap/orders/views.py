from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer
from django.http import Http404

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        status = self.request.query_params.get("status")  

        if status:
            status = status.capitalize()
            if status.lower() == "active":  # check if user is looking for active orders
                queryset = queryset.exclude(status="Completed")  # dont include orders
            else:
                queryset = queryset.filter(status=status)
                
        print(f"Filtered orders count: {queryset.count()}")
        return queryset

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    lookup_field = "order_id"  # Lookup using order_id

    def get_queryset(self):
        return Order.objects.all()

    def get_object(self):
        order_id = self.kwargs.get("order_id")
        try:
            return Order.objects.get(order_id=order_id)  # Fetch using order_id
        except Order.DoesNotExist:
            raise Http404("Order not found")
