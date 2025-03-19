from django.core.management.base import BaseCommand
import csv
from restaurants.models import Restaurant
from django.utils.timezone import make_aware
from datetime import datetime

class Command(BaseCommand):
    help = 'Import restaurants from CSV'

    def handle(self, *args, **kwargs):
        try:
            with open('data/restaurants.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    try:
                        # Convert opening & closing times
                        opening_time = datetime.strptime(row['opening_time'], '%H:%M').time()
                        closing_time = datetime.strptime(row['closing_time'], '%H:%M').time()
                        
                        location = row.get('location', 'Unknown Location').strip()

                        # Create or update restaurant
                        restaurant, created = Restaurant.objects.update_or_create(
                            resto_id=row['resto_id'],
                            defaults={
                                'resto_name': row['resto_name'],
                                'resto_owner': row['resto_owner'],
                                'opening_time': opening_time,
                                'closing_time': closing_time,
                                'location': location,
                            }
                        )

                        # Handle ManyToMany cuisine type
                        cuisine_names = row['cuisine_type'].split(',')  
                        restaurant.set_cuisines(cuisine_names)  
                        restaurant.save()

                        if created:
                            self.stdout.write(self.style.SUCCESS(f"Created restaurant {restaurant.resto_name}"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Updated restaurant {restaurant.resto_name}"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing row {row}: {e}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/restaurants.csv' not found."))
