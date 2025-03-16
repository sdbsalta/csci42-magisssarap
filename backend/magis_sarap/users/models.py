from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

def phone_validate(value):
    if value.isdigit() and len(value) == 11 and value[:2] == "09":
        return value
    raise ValidationError("Enter a valid 11-digit phone number.")

def email_validate(value):
    if value.endswith("@ateneo.edu"):  # Fixed missing '@'
        return value
    raise ValidationError("Enter a valid Ateneo email.")

def user_id_validate(value):
    if len(str(value)) == 6:
        return value
    raise ValidationError("Enter a valid Ateneo student ID number.")

class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, name, contact_no, email_address, password=None, user_type='Customer'):
        if not user_id:
            raise ValueError("Users must have a valid user ID.")
        if not email_address:
            raise ValueError("Users must have an email address.")

        user = self.model(
            user_id=user_id,
            name=name,
            contact_no=contact_no,
            email_address=email_address,
            user_type=user_type
        )
        user.set_password(password)  # Hashing handled by Django
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, name, contact_no, email_address, password):
        user = self.create_user(user_id, name, contact_no, email_address, password, user_type="Admin")
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.IntegerField(
        primary_key=True, 
        validators=[user_id_validate],
        unique=True,
        error_messages={'unique': "This Ateneo Student ID has already been registered."}
    )
    name = models.CharField(max_length=30)
    contact_no = models.CharField(
        max_length=11,
        validators=[phone_validate],
        unique=True,
        error_messages={'unique': "This phone number has already been registered."}
    )
    email_address = models.EmailField(
        validators=[email_validate],
        unique=True,
        error_messages={'unique': "This Ateneo Student email has already been registered.", 'invalid': "Enter a valid Ateneo email."}
    )
    password = models.CharField(max_length=128)  # Allow Django's hashing
    user_type = models.CharField(
        max_length=16,
        choices=[('Customer', 'Customer'), ('Restaurant Owner', 'Restaurant Owner'), ('Admin', 'Admin')],
        default='Customer'
    )
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Needed for Django admin

    # Fix conflicting related_name issues
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="user_groups",  # Custom related name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="user_permissions",  # Custom related name
        blank=True
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_id'  # Use user_id instead of username
    REQUIRED_FIELDS = ['name', 'contact_no', 'email_address']

    def __str__(self):
        return f"{self.user_id} - {self.name}"
    
    @property
    def id(self):
        return self.user_id

class RestaurantOwner(User):
    resto_name = models.CharField(
        max_length=30,
        unique=True,
        blank=False,
        null=False
    )
