from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        status = self.request.query_params.get("status")  

        if status:
            if status.lower() == "active":  # check if user is looking for active orders
                queryset = queryset.exclude(status="Completed")  # dont include orders
            else:
                queryset = queryset.filter(status=status)
                
        print(f"Filtered orders count: {queryset.count()}")
        return queryset

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
