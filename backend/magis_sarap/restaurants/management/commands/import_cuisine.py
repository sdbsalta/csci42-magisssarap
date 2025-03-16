from django.core.management.base import BaseCommand
import csv
from restaurants.models import CuisineType

class Command(BaseCommand):
    help = 'Import cuisine types from CSV'

    def handle(self, *args, **kwargs):
        try:
            with open('data/cuisine_types.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    try:
                        # Create or update CuisineType
                        cuisine, created = CuisineType.objects.update_or_create(
                            id=row['id'],
                            defaults={'type': row['type']}
                        )

                        if created:
                            self.stdout.write(self.style.SUCCESS(f"Created cuisine type {cuisine.type}"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Updated cuisine type {cuisine.type}"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing row {row}: {e}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/cuisine_types.csv' not found."))
