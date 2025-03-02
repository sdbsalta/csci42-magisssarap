from django import forms
from .models import User

class CreateCustomerForm(forms.ModelForm):
     user_id = forms.IntegerField(
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
      fields = ['user_id', 'name', 'contact_no', 'email_address', 'password']