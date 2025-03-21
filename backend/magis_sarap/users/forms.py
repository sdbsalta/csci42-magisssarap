from django import forms
from .models import User, RestaurantOwner

class CreateCustomerForm(forms.ModelForm):
     id = forms.IntegerField(
          label="Student ID",
          widget=forms.NumberInput(
               attrs={'placeholder': 'Enter Ateneo Student ID', 'class': 'form-control'}
          )
     )

     name = forms.CharField(
          label="Name",
          widget=forms.TextInput(
               attrs={'placeholder': 'Enter Name', 'class': 'form-control'}
          )
     )

     contact_no = forms.CharField(
          label="Contact No",
          widget=forms.TextInput(
               attrs={'placeholder': 'Enter Contact No.', 'class': 'form-control'}
          )
     )

     email_address = forms.EmailField(
          label="Email Address",
          widget=forms.EmailInput(
               attrs={'placeholder': 'Enter Ateneo Email', 'class': 'form-control'}
          )
     )

     password = forms.CharField(
          label="Password",
          widget=forms.PasswordInput(
               attrs={'placeholder': 'Enter Password', 'class': 'form-control'}
          )
     )
     
     class Meta:
      model = User
      fields = ['id', 'name', 'contact_no', 'email_address', 'password']


class CreateRestaurantOwnerForm(forms.ModelForm):
     id = forms.IntegerField(
          label="Student ID",
          widget=forms.NumberInput(
               attrs={'placeholder': 'Enter Ateneo Student ID', 'class': 'form-control'}
          )
     )

     name = forms.CharField(
          label="Name",
          widget=forms.TextInput(
               attrs={'placeholder': 'Enter Name', 'class': 'form-control'}
          )
     )

     contact_no = forms.CharField(
          label="Contact No",
          widget=forms.TextInput(
               attrs={'placeholder': 'Enter Contact No.', 'class': 'form-control'}
          )
     )

     email_address = forms.EmailField(
          label="Email Address",
          widget=forms.EmailInput(
               attrs={'placeholder': 'Enter Ateneo Email', 'class': 'form-control'}
          )
     )

     resto_name = forms.CharField(
          label="Restaurant Name",
          widget=forms.TextInput(
                    attrs={'placeholder': 'Enter Restaurant Name', 'class': 'form-control'}
               )
     )

     password = forms.CharField(
          label="Password",
          widget=forms.PasswordInput(
               attrs={'placeholder': 'Enter Password', 'class': 'form-control'}
          )
     )
     
     class Meta:
      model = RestaurantOwner
      fields = ['id', 'name', 'contact_no', 'resto_name', 'email_address', 'password']