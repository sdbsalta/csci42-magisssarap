import csv
from django.core.management.base import BaseCommand
from users.models import User, RestaurantOwner
from django.contrib.auth.hashers import make_password
from restaurants.models import Restaurant

class Command(BaseCommand):
    help = "Import users from a CSV file"

    def handle(self, *args, **kwargs):
        file_path = "data/users.csv"  # Ensure this file exists in the correct path

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Hash password before saving
                row["password"] = make_password(row["password"])

                if row["user_type"] == "Restaurant Owner":
                    user = RestaurantOwner.objects.create(
                        user_id=row["user_id"],
                        name=row["name"],
                        contact_no=row["contact_no"],
                        email_address=row["email_address"],
                        password=row["password"],
                        user_type=row["user_type"],
                        resto_name=row["resto_name"],
                        is_active=True  # Add this line
                    )
                else:
                    user = User.objects.create(
                        user_id=row["user_id"],
                        name=row["name"],
                        contact_no=row["contact_no"],
                        email_address=row["email_address"],
                        password=row["password"],
                        user_type=row["user_type"],
                        is_active=True  # Add this line
                    )

        self.stdout.write(self.style.SUCCESS("Successfully imported users from CSV."))
