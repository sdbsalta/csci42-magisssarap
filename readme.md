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
python manage.py import_restaurants
```
