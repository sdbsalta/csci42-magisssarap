from django.contrib.auth.hashers import make_password
from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse, reverse_lazy
from .models import User, RestaurantOwner
from .forms import CreateCustomerForm, CreateRestaurantOwnerForm

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
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get('email_address')
            password = data.get('password')

            try:
                user = User.objects.get(email_address=email)
                if check_password(password, user.password):  
                    return JsonResponse({"message": "Login successful", "user_type": user.user_type}, status=200)
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
            data = json.loads(request.body)

            # Extracting fields
            user_id = data.get("user_id")
            name = data.get("name")
            contact_no = data.get("contact_no")
            email_address = data.get("email_address")
            password = data.get("password")
            
            # Hash the password
            hashed_password = make_password(password)

            # Create new user
            user = User.objects.create(
                user_id=user_id,
                name=name,
                contact_no=contact_no,
                email_address=email_address,
                password=hashed_password,
                user_type="Customer"
            )

            return JsonResponse({"message": "Customer registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def register_restaurant_owner(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            user_id = data.get("user_id")
            name = data.get("name")
            contact_no = data.get("contact_no")
            email_address = data.get("email_address")
            password = data.get("password")
            resto_name = data.get("resto_name")

            hashed_password = make_password(password)

            owner = RestaurantOwner.objects.create(
                user_id=user_id,
                name=name,
                contact_no=contact_no,
                email_address=email_address,
                password=hashed_password,
                user_type="Restaurant Owner",
                resto_name=resto_name
            )

            return JsonResponse({"message": "Restaurant Owner registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_in_user(request):
    return Response({'user_id': request.user.id, 'username': request.user.username})

@api_view(['GET', 'PUT'])
def user_detail(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
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

class CreateCustomerView(CreateView):
    model = User
    template_name = 'customer_create.html'
    form_class = CreateCustomerForm
    success_url = reverse_lazy('users:customer-register')

    def form_valid(self, form):
        form.instance.user_type = "Customer"
        return super().form_valid(form)
    
class CreateRestaurantOwnerView(CreateView):
    model = RestaurantOwner
    template_name = 'restaurant_owner_create.html'
    form_class = CreateRestaurantOwnerForm

    def form_valid(self, form):
        form.instance.user_type = "Restaurant Owner"
        response = super().form_valid(form)

        self.request.session['resto_name'] = self.object.resto_name
        self.request.session['resto_owner'] = self.object.name

        return response

    def get_success_url(self):
        resto_owner = self.object.name
        resto_name = self.object.resto_name
        return reverse('restaurants:create-restaurant', kwargs={'resto_name': resto_name})