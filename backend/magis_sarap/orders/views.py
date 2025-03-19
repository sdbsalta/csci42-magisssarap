from django.shortcuts import get_object_or_404
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from rest_framework.views import APIView
from .models import Order
from django.views import View
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # 👈 Require authentication

    def get_queryset(self):
        queryset = Order.objects.all()
        status = self.request.query_params.get("status")  

        if status:
            status = status.capitalize()  
            
            if status.lower() == "active": 
                queryset = queryset.exclude(status="Completed") 
            else:
                queryset = queryset.filter(status=status)  
                
        print(f"Filtered orders count: {queryset.count()}")
        return queryset

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    lookup_field = "order_id"  # Lookup using order_id
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Order.objects.all()

    def get_object(self):
        order_id = self.kwargs.get("order_id")
        try:
            return Order.objects.get(order_id=order_id)  # Fetch using order_id
        except Order.DoesNotExist:
            raise Http404("Order not found")
''''''
class PendingOrderView(APIView): # checks if may order nako
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        user = request.user
        pending_order = Order.objects.filter(user__id=user.id, status="Pending").first()
        
        if pending_order:
            serializer = OrderSerializer(pending_order)
            return Response(serializer.data)
        else:
            raise Http404("No pending orders found")
