from django.core.management.base import BaseCommand
import csv
from restaurants.models import Restaurant, CuisineType
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

                        # Create or update restaurant
                        restaurant, created = Restaurant.objects.update_or_create(
                            resto_id=row['resto_id'],
                            defaults={
                                'resto_name': row['resto_name'],
                                'resto_owner': row['resto_owner'],
                                'opening_time': opening_time,
                                'closing_time': closing_time,
                            }
                        )

                        # Handle ManyToMany cuisine type
                        cuisine_ids = row['cuisine_type'].split(',')  # Split in case of multiple cuisines
                        cuisines = CuisineType.objects.filter(id__in=cuisine_ids)
                        restaurant.cuisine_type.set(cuisines)  # Use .set() to assign many-to-many relationships

                        if created:
                            self.stdout.write(self.style.SUCCESS(f"Created restaurant {restaurant.resto_name}"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Updated restaurant {restaurant.resto_name}"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing row {row}: {e}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/restaurants.csv' not found."))
