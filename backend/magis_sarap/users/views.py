from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse, reverse_lazy
from .models import User, RestaurantOwner
from .forms import CreateCustomerForm, CreateRestaurantOwnerForm

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import User

from django.contrib.auth.hashers import check_password

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