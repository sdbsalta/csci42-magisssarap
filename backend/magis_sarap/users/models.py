from django.db import models
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

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

class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, name, contact_no, email_address, password, user_type="Customer"):
        if not email_address:
            raise ValueError("Users must have an email address")
        user = self.model(
            user_id=user_id,
            name=name,
            contact_no=contact_no,
            email_address=self.normalize_email(email_address),
            user_type=user_type,
        )
        user.set_password(password)  # Hash password properly
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, name, contact_no, email_address, password, user_type="Admin"):
        user = self.create_user(user_id, name, contact_no, email_address, password, user_type)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):  
    user_id = models.IntegerField(
        primary_key=True,
        unique=True,
        blank=False,
        null=False
    )
    name = models.CharField(max_length=30, blank=False, null=False)
    contact_no = models.CharField(max_length=11, unique=True, blank=False, null=False)
    email_address = models.EmailField(unique=True, blank=False, null=False)
    user_type = models.CharField(
        max_length=16,
        choices=[('Customer', 'Customer'), ('Restaurant Owner', 'Restaurant Owner')],
        blank=False,
        null=False
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # required for Django admin access

    objects = CustomUserManager()

    USERNAME_FIELD = "email_address"
    REQUIRED_FIELDS = ["user_id", "name", "contact_no", "user_type"]

    def __str__(self):
        return self.name
   
class RestaurantOwner(User):
    resto_name = models.CharField(
        max_length=30,
        unique=True,
        blank=False,
        null=False
    )    
    
"""
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
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
  
"""
    

