from django.core.management.base import BaseCommand
import csv
from orders.models import Order, OrderItem
from menu.models import FoodItem

class Command(BaseCommand):
    help = 'Import order items from CSV'

    def handle(self, *args, **kwargs):
        try:
            with open('data/order_items.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile, skipinitialspace=True)

                for row in reader:
                    try:
                        # Fetch order using the correct field name
                        order_id = row['order_id'].strip()
                        order = Order.objects.filter(order_id=order_id).first()

                        if not order:
                            self.stdout.write(self.style.ERROR(f"Order ID {order_id} not found. Skipping item."))
                            continue

                        # Fetch food item using `food_item_id` instead of `item_no`
                        food_item_id = row['food_item_id'].strip()
                        food_item = FoodItem.objects.filter(id=food_item_id).first()

                        if not food_item:
                            self.stdout.write(self.style.ERROR(f"Food Item ID {food_item_id} not found. Skipping item."))
                            continue

                        # Convert quantity safely
                        try:
                            quantity = int(row['quantity'].strip())
                            if quantity <= 0:
                                raise ValueError("Quantity must be positive")
                        except ValueError:
                            self.stdout.write(self.style.ERROR(f"Invalid quantity for order {order_id}, item {food_item_id}. Skipping."))
                            continue

                        # Convert price safely (if needed)
                        try:
                            price = int(row['price'].strip())
                        except ValueError:
                            self.stdout.write(self.style.ERROR(f"Invalid price for order {order_id}, item {food_item_id}. Skipping."))
                            continue

                        # Create or update the order item
                        order_item, created = OrderItem.objects.update_or_create(
                            order=order,
                            food_item=food_item,
                            defaults={'quantity': quantity, 'price': price}
                        )

                        if created:
                            self.stdout.write(self.style.SUCCESS(f"Added {quantity}x {food_item.name} to order {order_id} at {price} each"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Updated {food_item.name} in order {order_id} to {quantity}x at {price} each"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing row {row}: {e}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/order_items.csv' not found."))
