# frontend
Clone the repository:
```
git clone <repository-url>
cd <project-directory>
```
Install dependencies:
```
npm install
```
To run locally:
```
npm run dev
```

# backend
Create a virtual environment:
```
python -m venv venv
source venv/bin/activate (Mac)
venv\Scripts\activate (Windows)
```
Install dependencies:
```
pip install -r requirements.txt
```
Perform migrations:
```
python manage.py migrate
python manage.py makemigrations
```
Run locally:
```
cd magis_sarap
python manage.py runserver
```

# to import data
Run the following commands:
```
python manage.py import_users
python manage.py import_cuisine
python manage.py import_restaurants
python manage.py import_food_items
python manage.py import_orders
python manage.py import_order_items
```

# delete / flush information
Due to the number of migrations I needed to do, you might need to flush your DB.
```
python manage.py flush 
find . -path "/migrations/.py" -not -name "init.py" -delete
rm db.sqlite3
python manage.py makemigrations
python manage.py migrate
```
