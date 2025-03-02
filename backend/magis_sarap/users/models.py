from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator

def phone_validate(value):
    if value.isdigit()==True and len(value)==11 and value[:2]=="09":
        return value
    else:
        raise ValidationError("Enter a valid 11-digit phone number.")

def email_validate(value):
    if value.endswith("ateneo.edu"):
        return value
    else:
        raise ValidationError("Enter a valid Ateneo email.")

def user_id_validate(value):
    if len(str(value))==6:
        return value;
    else:
        raise ValidationError("Enter a valid Ateneo student ID number.")

# Create your models here.
class User(models.Model):
    user_id = models.IntegerField(
        primary_key=True, 
        validators=[user_id_validate],
        unique=True,
        error_messages={'unique': "This Ateneo Student ID has already been registered."},
        blank=False,
        null=False
    )
    name = models.CharField(
        max_length=30,
        blank=False, 
        null=False
    )
    # Used CharField for phone no. instead of IntegerField to enforce the "09-" format
    contact_no = models.CharField(
        max_length=11,
        validators=[phone_validate],
        unique=True,
        error_messages={'unique': "This phone number has already been registered."},
        blank=False, 
        null=False
    )
    email_address = models.EmailField(
        validators=[email_validate],
        unique=True,
        error_messages={'unique': "This Ateneo Student email has already been registered.", 'invalid':"Enter a valid Ateneo email."},
        blank=False, 
        null=False
    )
    password = models.CharField(
        max_length=15,
        blank=False, 
        null=False
    )
    user_type = models.CharField(
        max_length=16,
        choices=[('Customer', 'Customer'), ('Restaurant Owner', 'Restaurant Owner')],
        blank=False, 
        null=False
    )

    def __str__(self):
        return self.name
    
class RestaurantOwner(User):
    resto_name = models.CharField(
        max_length=30,
        unique=True,
        blank=False,
        null=False
    )
