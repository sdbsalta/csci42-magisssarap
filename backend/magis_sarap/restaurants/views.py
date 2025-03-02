from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import Restaurant, CuisineType
from .forms import CreateRestaurantForm

# Create your views here.
class CreateRestaurantView(CreateView):
    model = Restaurant
    template_name = 'create_restaurant.html'
    form_class = CreateRestaurantForm
    success_url = reverse_lazy(''); # CHANGE THIS TO ACTUAL REDIRECT URL

    def form_valid(self, form):
        resto_owner = self.request.session.get('resto_owner')
        resto_name = self.request.session.get('resto_name')

        if resto_owner:
            form.instance.resto_owner = resto_owner
        if resto_name:
            form.instance.resto_name = resto_name

        response = super().form_valid(form)

        cuisine_choices = self.request.POST.getlist('cuisine_type')
        cuisine_objects = CuisineType.objects.filter(type__in=cuisine_choices)
        self.object.cuisine_type.set(cuisine_objects)

        return response