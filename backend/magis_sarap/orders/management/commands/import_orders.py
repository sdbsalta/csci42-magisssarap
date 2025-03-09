from django.core.management.base import BaseCommand
from django.utils.timezone import make_aware
import csv
from datetime import datetime
from orders.models import Order
from users.models import User
from restaurants.models import Restaurant

class Command(BaseCommand):  # <- This is the missing class
    help = 'Import orders from CSV file'

    def handle(self, *args, **kwargs):
        file_path = 'data/orders.csv'  # Update path if needed
        
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                try:
                    customer_id = int(row['customer'])  # Ensure integer type
                    print(f"Looking for user_id: {customer_id}")  # Debugging
                    
                    customer = User.objects.get(user_id=customer_id)
                    if not customer:
                        self.stderr.write(self.style.ERROR(f"Skipping row: User with user_id={customer_id} does not exist."))
                        continue  # Skip row if user doesn't exist

                    restaurant_id = int(row['restaurant'])
                    restaurant = Restaurant.objects.filter(resto_id=restaurant_id).first()
                    if not restaurant:
                        self.stderr.write(self.style.ERROR(f"Skipping row: Restaurant with resto_id={restaurant_id} does not exist."))
                        continue  # Skip row if restaurant doesn't exist

                    date_created = make_aware(datetime.strptime(row['date_created'], "%Y-%m-%d %H:%M:%S"))

                    time_completed = None
                    if row['time_completed']:
                        time_completed = make_aware(datetime.strptime(row['time_completed'], "%Y-%m-%d %H:%M:%S"))

                    order, created = Order.objects.update_or_create(
                        order_id=row['order_id'], 
                        defaults={
                            'customer': customer,
                            'restaurant': restaurant,
                            'status': row['status'],
                            'date_created': date_created,
                            'time_completed': time_completed,
                            'voucher_code': row['voucher_code'] if row['voucher_code'] else None,
                            'total_price': row['total_price'],
                        }
                    )

                    if created:
                        self.stdout.write(self.style.SUCCESS(f"Created order {order.order_id}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Updated order {order.order_id}"))

                except Exception as e:
                    self.stderr.write(self.style.ERROR(f"Error processing row {row}: {e}"))

