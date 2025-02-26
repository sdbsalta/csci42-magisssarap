from django.db import models

# Create your models here.
class CuisineType(models.Model):
    type = models.CharField(
        max_length=20,
        unique=True
    )

    def __str__(self):
        return self.type

class Restaurant(models.Model):
    resto_id = models.AutoField(
        primary_key=True
    )
    resto_name = models.CharField(
        max_length=30,
        unique=True,
        blank=False,
        null=False
    )
    # Changed Opening Hours to getting operating hours by asking for an opening time and closing time
    opening_time = models.TimeField(
        blank=False,
        null=False
    )
    closing_time = models.TimeField(
        blank=False,
        null=False
    )
    cuisine_type = models.ManyToManyField(CuisineType)

    def operating_hours(self):
        return f"{self.opening_time.strftime('%I:%M %p')} - {self.closing_time.strftime('%I:%M %p')}" 
