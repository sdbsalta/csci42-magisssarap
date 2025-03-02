from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse, reverse_lazy
from .models import User, RestaurantOwner
from .forms import CreateCustomerForm, CreateRestaurantOwnerForm

# Create your views here.
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