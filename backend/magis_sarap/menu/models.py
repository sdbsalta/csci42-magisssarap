from django.db import models
from restaurants.models import Restaurant

# Create your models here.
class FoodItem(models.Model):
    id = models.AutoField(primary_key=True)
    # Instead of having item_id as the primary key, I changed it to generic id and
    # used item_no for numbering items of each resto so that resto A and resto B can
    # both have their own items 1, 2, 3 and so on
    item_no = models.IntegerField(editable=False)
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE, 
        related_name="food_items"
    )
    description = models.TextField(
        max_length=100,
        blank=False,
        null=False
    )
    is_vegan = models.BooleanField(
        blank=False,
        null=False
    )
    is_halal = models.BooleanField(
        blank=False,
        null=False
    )
    # Changed this to can be null
    calories = models.IntegerField(
        blank=True,
        null=True
    )
    price = models.IntegerField(
        blank=False,
        null=False
    )

    food_image = models.ImageField()

    class Meta:
        unique_together = ("restaurant", "item_no")

    def save(self, *args, **kwargs):
        if not self.item_no:  # Only assign item_id if it's a new object
            last_item = FoodItem.objects.filter(restaurant=self.restaurant).aggregate(models.Max("item_no"))
            self.item_no = (last_item["item_no__max"] or 0) + 1  # Increment last item_id
        super().save(*args, **kwargs)
