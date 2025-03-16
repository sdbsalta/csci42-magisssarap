from django.db import models
from django.utils.timezone import now
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()  

class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('Pending', 'Pending'), # meaning di pako nagoorder - iya
        ('Order Placed', 'Order Placed'),
        ('Order Confirmed', 'Order Confirmed'),
        ('Order Cancelled', 'Order Cancelled'),
        ('Preparing Order', 'Preparing Order'),
        ('Ready for Pick Up', 'Ready for Pick Up'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Completed', 'Completed'),
    ]

    order_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )
    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='orders'
    )
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.CASCADE,
        related_name='orders'
    )
    status = models.CharField(
        max_length=20,
        choices=ORDER_STATUS_CHOICES,
        default='Order Placed'
    )
    date_created = models.DateTimeField(
        default=now
    )
    time_completed = models.DateTimeField(
        null=True,
        blank=True
    )
    voucher_code = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    notes = models.TextField(  # added new field for customer reqs - iya
        blank=True,
        null=True,
        help_text="Special instructions or requests from the customer."
    )


    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = f"ORD-{now().strftime('%y%m%d')}-{uuid.uuid4().hex[:3].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.order_id} - {self.customer}" 

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='order_items'
    )
    food_item = models.ForeignKey(
        'menu.FoodItem',
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.food_item.name} (x{self.quantity}) - {self.order}" 

class Review(models.Model):
    review_id = models.CharField(
        max_length=10,
        unique=True,
        editable=False
    )
    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.PositiveIntegerField()
    comment = models.TextField(
        blank=True,
        null=True
    )
    date_created = models.DateTimeField(
        default=now
    )

    def save(self, *args, **kwargs):
        if not self.review_id:
            self.review_id = f"REV-{uuid.uuid4().hex[:4].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Review {self.review_id} - {self.customer}"

class Delivery(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, 
        related_name='delivery'
    )
    delivery_person = models.ForeignKey(
        User, on_delete=models.SET_NULL, 
        null=True, blank=True, 
        related_name='deliveries'
    )
    status = models.CharField(
        max_length=50, 
        choices=[
        ('Pending', 'Pending'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ]
    )
    delivery_location = models.CharField(  # added field for delivery location - iya
        max_length=255,
        blank=True,
        null=True,
        help_text="Please follow proper naming conventions (e.g., CTC313, etc.) for the delivery address."
    )

    estimated_time = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Delivery for {self.order} - {self.status}"
