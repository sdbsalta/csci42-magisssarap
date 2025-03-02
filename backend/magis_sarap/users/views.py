from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import User
from .forms import CreateCustomerForm

# Create your views here.
class CreateCustomerView(CreateView):
    model = User
    template_name = 'customer_create.html'
    form_class = CreateCustomerForm
    success_url = reverse_lazy('customer-register')

    def form_valid(self, form):
        form.instance.user_type = "Customer"
        return super().form_valid(form)