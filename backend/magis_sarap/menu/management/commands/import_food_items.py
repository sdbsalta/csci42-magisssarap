from django.core.management.base import BaseCommand
import csv
from menu.models import FoodItem
from restaurants.models import Restaurant

class Command(BaseCommand):
    help = 'Import food items from CSV'

    def handle(self, *args, **kwargs):
        try:
            with open('data/food_items.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile, skipinitialspace=True)
                
                for row in reader:
                    try:
                        # Fix: Use resto_id instead of id
                        restaurant_id = row['restaurant_id'].strip()
                        restaurant = Restaurant.objects.filter(resto_id=restaurant_id).first()
                        
                        if not restaurant:
                            self.stdout.write(self.style.ERROR(f"Restaurant ID {restaurant_id} not found. Skipping row."))
                            continue
                        
                        # Handle boolean conversion
                        is_vegan = row['is_vegan'].strip() == '1'
                        is_halal = row['is_halal'].strip() == '1'

                        # Convert calories and price safely
                        calories = int(row['calories'].strip()) if row['calories'].strip().isdigit() else None
                        price = int(row['price'].strip())

                        # Create FoodItem
                        food_item, created = FoodItem.objects.update_or_create(
                            restaurant=restaurant,
                            item_no=row['item_no'].strip(),
                            defaults={
                                'name': row['name'].strip(),
                                'description': row['description'].strip(),
                                'is_vegan': is_vegan,
                                'is_halal': is_halal,
                                'calories': calories,
                                'price': price
                            }
                        )

                        if created:
                            self.stdout.write(self.style.SUCCESS(f"Created food item {food_item.name}"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Updated food item {food_item.name}"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing row {row}: {e}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/food_items.csv' not found."))
