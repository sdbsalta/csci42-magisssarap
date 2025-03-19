from django.core.management.base import BaseCommand
import csv
from django.utils import timezone
from datetime import datetime
from orders.models import Order
from django.contrib.auth import get_user_model
from restaurants.models import Restaurant

User = get_user_model()

class Command(BaseCommand):
    help = 'Import orders from CSV'

    def handle(self, *args, **kwargs):
        try:
            with open('data/orders.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile, skipinitialspace=True)

                for row in reader:
                    try:
                        # Fetch related customer and restaurant using correct field names
                        customer_id = row['customer_id'].strip()
                        restaurant_id = row['restaurant_id'].strip()

                        customer = User.objects.filter(id=customer_id).first()
                        if not customer:
                            self.stdout.write(self.style.ERROR(f"Customer ID {customer_id} not found. Skipping order {row['order_id']}."))
                            continue

                        restaurant = Restaurant.objects.filter(resto_id=restaurant_id).first()
                        if not restaurant:
                            self.stdout.write(self.style.ERROR(f"Restaurant ID {restaurant_id} not found. Skipping order {row['order_id']}."))
                            continue
                        
                        # Convert total_price safely
                        try:
                            total_price = float(row['total_price'].strip())
                        except ValueError:
                            self.stdout.write(self.style.ERROR(f"Invalid total price for order {row['order_id']}. Skipping."))
                            continue

                        # Convert date_created to timezone-aware datetime
                        date_created = row.get('date_created', '').strip()
                        if date_created:
                            try:
                                naive_datetime = datetime.strptime(date_created, "%Y-%m-%d %H:%M:%S")
                                date_created = timezone.make_aware(naive_datetime, timezone.get_current_timezone())
                            except ValueError:
                                self.stdout.write(self.style.ERROR(f"Invalid date format for order {row['order_id']}. Skipping."))
                                continue
                        else:
                            date_created = None

                        # Convert time_completed to timezone-aware datetime
                        time_completed = row.get('time_completed', '').strip()
                        if time_completed:
                            try:
                                naive_datetime = datetime.strptime(time_completed, "%Y-%m-%d %H:%M:%S")
                                time_completed = timezone.make_aware(naive_datetime, timezone.get_current_timezone())
                            except ValueError:
                                self.stdout.write(self.style.ERROR(f"Invalid time format for order {row['order_id']}. Skipping."))
                                continue
                        else:
                            time_completed = None

                        # Create or update the order
                        order, created = Order.objects.update_or_create(
                            order_id=row['order_id'].strip(),
                            defaults={
                                'customer': customer,
                                'restaurant': restaurant,
                                'status': row.get('status', 'Order Placed').strip(),
                                'date_created': date_created,
                                'time_completed': time_completed,
                                'voucher_code': row.get('voucher_code', '').strip() or None,
                                'total_price': total_price,
                                'notes': row.get('notes', '').strip(),
                            }
                        )

                        if created:
                            self.stdout.write(self.style.SUCCESS(f"Created order {order.order_id}"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Updated order {order.order_id}"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing order {row['order_id']}: {e}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/orders.csv' not found."))
