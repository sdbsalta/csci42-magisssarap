from django.shortcuts import get_object_or_404
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from rest_framework.views import APIView

from .models import CartItem, Order, Order, CartItem, OrderItem, Voucher
from users.models import RestaurantOwner  # Import from users app
from restaurants.models import Restaurant  # Import Restaurant model
from menu.models import FoodItem
from django.views import View
from .serializers import CartItemSerializer, OrderSerializer, OrderItemSerializer, DeliverySerializer, CartItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from menu.models import FoodItem

#########################################################
# CUSTOMER VIEWS
#########################################################
class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self):
        user = self.request.user  # logged in
        queryset = Order.objects.filter(customer=user)  # only my oreders

        status = self.request.query_params.get("status")  
        if status:
            status = status.capitalize()  
            
            if status.lower() == "active": 
                queryset = queryset.exclude(status="Completed") 
            else:
                queryset = queryset.filter(status=status)  
                
        print(f"Filtered orders count for user {user.id}: {queryset.count()}")
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

class CartView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        cart_items = CartItem.objects.filter(customer=request.user)
        return Response(CartItemSerializer(cart_items, many=True).data)

    def post(self, request):
        food_item = get_object_or_404(FoodItem, id=request.data.get("food_item_id"))
        cart_item, created = CartItem.objects.get_or_create(
            customer=request.user, food_item=food_item,
            defaults={'quantity': 1}
        )
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        return Response({"message": "Added to cart"})

    def delete(self, request):
        food_item = get_object_or_404(FoodItem, id=request.data.get("food_item_id"))
        cart_item = CartItem.objects.filter(customer=request.user, food_item=food_item).first()
        if cart_item:
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
        return Response({"message": "Removed from cart"})
    
class ApplyVoucherView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get("code")
        voucher = Voucher.objects.filter(code=code).first()

        if not voucher or not voucher.is_valid():
            return Response({"error": "Invalid or expired voucher"}, status=400)

        return Response({"message": "Voucher applied", "discount": voucher.discount_percentage})

#########################################################
# RESTAURANT VIEWS
#########################################################
class ActiveOrdersRestoView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        if self.request.user.user_type != 'Restaurant Owner':
            return Order.objects.none()

        try:
            restaurant_owner = RestaurantOwner.objects.get(id=self.request.user.id)
            restaurant = Restaurant.objects.get(resto_name=restaurant_owner.resto_name)
            return Order.objects.filter(
                restaurant=restaurant.resto_id,
                status__in=[
                    'Order Placed', 'Order Confirmed', 'Preparing Order',
                    'Ready for Pick Up', 'Out for Delivery'
                ]
            ).order_by('-date_created')
        except (RestaurantOwner.DoesNotExist, Restaurant.DoesNotExist):
            return Order.objects.none()

class PastOrdersRestoView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        if self.request.user.user_type != 'Restaurant Owner':
            return Order.objects.none()

        try:
            restaurant_owner = RestaurantOwner.objects.get(id=self.request.user.id)
            restaurant = Restaurant.objects.get(resto_name=restaurant_owner.resto_name)
            return Order.objects.filter(
                restaurant=restaurant.resto_id,
                status__in=['Completed']
            ).order_by('-date_created')
        except (RestaurantOwner.DoesNotExist, Restaurant.DoesNotExist):
            return Order.objects.none() 

class OrderDetailRestoView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    lookup_field = "order_id"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Order.objects.all()

    def get_object(self):
        order_id = self.kwargs.get("order_id")
        try:
            order = Order.objects.get(order_id=order_id)

            # Fetch the RestaurantOwner properly
            restaurant_owner = RestaurantOwner.objects.filter(id=self.request.user.id).first()
            if not restaurant_owner:
                raise Http404("You do not have permission to view this order.")

            print(f"Restaurant Owner Resto Name from DB: {restaurant_owner.resto_name}")
            
            if restaurant_owner.resto_name != order.restaurant.resto_name:
                raise Http404("You do not have permission to view this order.")

            return order
        except Order.DoesNotExist:
            raise Http404("Order not found")
