from django.shortcuts import get_object_or_404
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from rest_framework.views import APIView

from .models import CartItem, Order, Order, CartItem, VoucherItem, Voucher
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

class ActiveOrdersRestoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        print("\n=== ActiveOrdersRestoView ===")
        print("Request user:", request.user)
        print("User type:", request.user.user_type)
        print("User ID:", request.user.id)
        
        # Check if user is a restaurant owner
        if request.user.user_type != 'Restaurant Owner':
            return Response({
                "error": "Access denied. User is not a restaurant owner.",
                "user_type": request.user.user_type
            }, status=403)
        
        # Get the restaurant owner details
        try:
            restaurant_owner = RestaurantOwner.objects.get(id=request.user.id)
            print(f"Found restaurant owner: {restaurant_owner.name}")
            
            # Get the actual restaurant
            restaurant = Restaurant.objects.get(resto_name=restaurant_owner.resto_name)
            print(f"Found restaurant: {restaurant.resto_name} (ID: {restaurant.resto_id})")
            
            # Debug: Print all orders for this restaurant
            all_orders = Order.objects.filter(restaurant=restaurant.resto_id)
            print(f"\nAll orders for restaurant {restaurant.resto_name}:")
            for order in all_orders:
                print(f"Order {order.order_id}: Status = {order.status}")
            
            # Get active orders
            orders = Order.objects.filter(
                restaurant=restaurant.resto_id,  # Use the actual restaurant ID
                status__in=['Order Placed',
                            'Order Confirmed',
                            'Preparing Order',
                            'Ready for Pick Up',
                            'Out for Delivery'
                ]
            ).order_by('-date_created')
            
            print(f"\nActive orders found: {orders.count()}")
            for order in orders:
                print(f"Active Order {order.order_id}: {order.status}")
            
            serializer = OrderSerializer(orders, many=True)
            response_data = {
                'orders': [{
                    'order_id': order['order_id'],
                    'date': order['date_created'],
                    'status': order['status'],
                    'total': order['total_price']
                } for order in serializer.data]
            }
            return Response(response_data)
            
        except RestaurantOwner.DoesNotExist:
            print(f"No RestaurantOwner found for user ID: {request.user.id}")
            return Response({
                "error": "User is registered as a restaurant owner but no restaurant details found.",
                "user_id": request.user.id
            }, status=403)
        except Restaurant.DoesNotExist:
            print(f"No Restaurant found with name: {restaurant_owner.resto_name}")
            return Response({
                "error": f"No restaurant found with name: {restaurant_owner.resto_name}",
                "user_id": request.user.id
            }, status=403)
    
class PastOrdersRestoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        print("\n=== PastOrdersRestoView ===")
        print("Request user:", request.user)
        print("User type:", request.user.user_type)
        print("User ID:", request.user.id)
        
        # Check if user is a restaurant owner
        if request.user.user_type != 'Restaurant Owner':
            return Response({
                "error": "Access denied. User is not a restaurant owner.",
                "user_type": request.user.user_type
            }, status=403)
        
        # Get the restaurant owner details
        try:
            restaurant_owner = RestaurantOwner.objects.get(id=request.user.id)
            print(f"Found restaurant owner: {restaurant_owner.name}")
            
            # Get the actual restaurant
            restaurant = Restaurant.objects.get(resto_name=restaurant_owner.resto_name)
            print(f"Found restaurant: {restaurant.resto_name} (ID: {restaurant.resto_id})")
            
            # Debug: Print all orders for this restaurant
            all_orders = Order.objects.filter(restaurant=restaurant.resto_id)
            print(f"\nAll orders for restaurant {restaurant.resto_name}:")
            for order in all_orders:
                print(f"Order {order.order_id}: Status = {order.status}")
            
            # Get active orders
            orders = Order.objects.filter(
                restaurant=restaurant.resto_id,  # Use the actual restaurant ID
                status__in=['Order Cancelled',
                            'Completed'
                ]
            ).order_by('-date_created')
            
            print(f"\nPast orders found: {orders.count()}")
            for order in orders:
                print(f"Past Order {order.order_id}: {order.status}")
            
            serializer = OrderSerializer(orders, many=True)
            response_data = {
                'orders': [{
                    'order_id': order['order_id'],
                    'date': order['date_created'],
                    'status': order['status'],
                    'total': order['total_price']
                } for order in serializer.data]
            }
            return Response(response_data)
            
        except RestaurantOwner.DoesNotExist:
            print(f"No RestaurantOwner found for user ID: {request.user.id}")
            return Response({
                "error": "User is registered as a restaurant owner but no restaurant details found.",
                "user_id": request.user.id
            }, status=403)
        except Restaurant.DoesNotExist:
            print(f"No Restaurant found with name: {restaurant_owner.resto_name}")
            return Response({
                "error": f"No restaurant found with name: {restaurant_owner.resto_name}",
                "user_id": request.user.id
            }, status=403)    

class OrderDetailRestoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    print("IM HEREE")

    def get(self, request, order_id):  # Accept order_id as a parameter
        print("\n=== OrderDetailRestoView ===")
        print("Request user:", request.user)
        print("User type:", request.user.user_type)
        print("User ID:", request.user.id)
        
        # Check if user is a restaurant owner
        if request.user.user_type != 'Restaurant Owner':
            return Response({
                "error": "Access denied. User is not a restaurant owner.",
                "user_type": request.user.user_type
            }, status=403)
        
        # Get the restaurant owner details
        try:
            restaurant_owner = RestaurantOwner.objects.get(id=request.user.id)
            print(f"Found restaurant owner: {restaurant_owner.name}")
            
            # Get the actual restaurant
            restaurant = Restaurant.objects.get(resto_name=restaurant_owner.resto_name)
            print(f"Found restaurant: {restaurant.resto_name} (ID: {restaurant.resto_id})")
            
            # Get the specific order
            order = Order.objects.get(
                restaurant=restaurant,
                order_id=order_id
            )
            order_items = OrderItem.objects.filter(order=order)
            order_serializer = OrderSerializer(order)
            items_serializer = OrderItemSerializer(order_items, many=True)
            print('Serialized items:', items_serializer.data)
            delivery_serializer = DeliverySerializer(order.delivery)
            return Response({
                'order': {
                    'order_id': order_serializer.data['order_id'],
                    'status': order_serializer.data['status'],
                    'items': [{
                        'food_item_name': item['food_item_name'],
                        'quantity': item['quantity'],
                        'price': item['price']
                    } for item in items_serializer.data],
                    'estimated_time': delivery_serializer.data['estimated_time'],
                    'location': delivery_serializer.data['delivery_location'],
                    'voucher_code': order_serializer.data['voucher_code'],
                    'customer_phone': order_serializer.data['customer_phone'],
                    'notes': order_serializer.data['notes'],
                    'total_price': order_serializer.data['total_price'],
                }
            })

        except RestaurantOwner.DoesNotExist:
            print(f"No RestaurantOwner found for user ID: {request.user.id}")
            return Response({
                "error": "User is registered as a restaurant owner but no restaurant details found.",
                "user_id": request.user.id
            }, status=403)
        except Restaurant.DoesNotExist:
            print(f"No Restaurant found with name: {restaurant_owner.resto_name}")
            return Response({
                "error": f"No restaurant found with name: {restaurant_owner.resto_name}",
                "user_id": request.user.id
            }, status=403)
        except Order.DoesNotExist:
            print(f"No Order found with ID: {order_id}")
            return Response({
                "error": f"No order found with ID: {order_id}",
                "user_id": request.user.id
            }, status=404)    