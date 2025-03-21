from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse, reverse_lazy
from .models import User, RestaurantOwner
from .forms import CreateCustomerForm, CreateRestaurantOwnerForm
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User
from django.contrib.auth.hashers import check_password
from .serializers import RegisterUserSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from restaurants.models import Restaurant
from .models import Voucher
from .serializers import VoucherSerializer
from django.utils.timezone import now
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response




@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            id = data.get('id')  # Get id from request
            password = data.get('password')

            try:
                # Find the user by id
                user = User.objects.get(id=id)

                # Debugging: Print out the user's password and check if it matches the hash
                print("User found:", user.id)
                print("Stored password hash:", user.password)

                # Check if the password matches
                if check_password(password, user.password):
                    # Generate JWT access token using simplejwt
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)

                    # Return the response with the access token and user type
                    return JsonResponse({
                        "accessToken": access_token,
                        "message": "Login successful",
                        "user": {   
                            "id": user.id,
                            "name": user.name,
                            "email": user.email_address,
                            "user_type": user.user_type
                        }
                    }, status=200)

                else:
                    return JsonResponse({"message": "Invalid password"}, status=401)

            except User.DoesNotExist:
                return JsonResponse({"message": "User not found"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    
    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def logout_user(request):
    if request.method == "POST":
        logout(request)
        response = JsonResponse({"message": "Logout successful"}, status=200)

        response.delete_cookie("sessionid")
        response.delete_cookie("csrftoken")

        return response

    return JsonResponse({"message": "Method not allowed"}, status=405)
        
@csrf_exempt
def register_customer(request):
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)  # Parse JSON request body
            print("Received Data:", data)  # Debugging: Check request data
            
            serializer = RegisterUserSerializer(data=data)
            if serializer.is_valid():
                user = serializer.save()
                token, _ = Token.objects.get_or_create(user=user)
                return JsonResponse(
                    {
                        "message": "Customer registered successfully",
                        "accessToken": token.key,  # Changed from "token" to "accessToken"
                        "user": {"id": user.id, "name": user.name}
                    },
                    status=201
                )

            print("Serializer Errors:", serializer.errors)  
            return JsonResponse(serializer.errors, status=400)  # Return validation errors

        except Exception as e:
            import traceback
            print("ERROR:", traceback.format_exc())  
            return JsonResponse({"message": str(e)}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def register_restaurant_owner(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            id = data.get("id")
            name = data.get("name")
            contact_no = data.get("contact_no")
            email_address = data.get("email_address")
            password = data.get("password")
            resto_name = data.get("resto_name")
            opening_time = data.get("opening_time")
            closing_time = data.get("closing_time")
            cuisines = data.get("cuisines", [])

            hashed_password = make_password(password)

            with transaction.atomic():
                # Create the RestaurantOwner
                owner = RestaurantOwner.objects.create(
                    id=id,
                    name=name,
                    contact_no=contact_no,
                    email_address=email_address,
                    password=hashed_password,
                    user_type="Restaurant Owner",
                    resto_name=resto_name
                )

                # Create the Restaurant
                restaurant = Restaurant.objects.create(
                    resto_name=resto_name,
                    resto_owner=name,  # Using the owner's name as resto_owner
                    opening_time=opening_time,
                    closing_time=closing_time,
                    cuisines=json.dumps(cuisines)  # Store cuisines as JSON string
                )

            return JsonResponse({"message": "Restaurant Owner and Restaurant registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_logged_in_user(request):
    return Response({'id': request.user.id}) # removed 'username': request.user.username

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user_detail(request, id):
    try:
        user = User.objects.get(id=id)
        print(f"Received ID: {id}")
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VoucherViewSet(viewsets.ModelViewSet):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = [IsAuthenticated]  # Ensure only logged-in users can access

    def get_queryset(self):
        # Filter vouchers only for the authenticated user
        return Voucher.objects.filter(user=self.request.user)

    @action(detail=True, methods=["post"])
    def redeem(self, request, pk=None):
        try:
            voucher = self.get_object()
            if not voucher.is_active or voucher.expires_at < now():
                return Response({"message": "Voucher is expired or inactive"}, status=400)

            voucher.is_active = False  # Mark as used
            voucher.save()
            return Response({"message": "Voucher redeemed successfully!"})

        except Voucher.DoesNotExist:
            return Response({"message": "Voucher not found"}, status=404)

# class CreateCustomerView(CreateView):
#     model = User
#     template_name = 'customer_create.html'
#     form_class = CreateCustomerForm
#     success_url = reverse_lazy('users:customer-register')

#     def form_valid(self, form):
#         form.instance.user_type = "Customer"
#         return super().form_valid(form)
    
# class CreateRestaurantOwnerView(CreateView):
#     model = RestaurantOwner
#     template_name = 'restaurant_owner_create.html'
#     form_class = CreateRestaurantOwnerForm

#     def form_valid(self, form):
#         form.instance.user_type = "Restaurant Owner"
#         response = super().form_valid(form)

#         self.request.session['resto_name'] = self.object.resto_name
#         self.request.session['resto_owner'] = self.object.name

#         return response

#     def get_success_url(self):
#         resto_owner = self.object.name
#         resto_name = self.object.resto_name
#         return reverse('restaurants:create-restaurant', kwargs={'resto_name': resto_name})