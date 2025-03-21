from django.core.management.base import BaseCommand
import csv
import json
import os

class Command(BaseCommand):
    help = 'Import cuisine types from CSV and save as JSON'

    def handle(self, *args, **kwargs):
        try:
            cuisine_list = []
            with open('data/cuisine_types.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    cuisine_list.append(row['type'])  # Collect cuisine names

            # Save to a JSON file
            json_path = 'data/cuisine_types.json'
            with open(json_path, 'w', encoding='utf-8') as jsonfile:
                json.dump(cuisine_list, jsonfile, indent=4)

            self.stdout.write(self.style.SUCCESS(f"Successfully saved cuisine types to {json_path}"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("File 'data/cuisine_types.csv' not found."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {e}"))
