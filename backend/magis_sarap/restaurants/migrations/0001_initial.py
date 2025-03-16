# Generated by Django 5.1.6 on 2025-03-16 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CuisineType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('resto_id', models.AutoField(primary_key=True, serialize=False)),
                ('resto_name', models.CharField(max_length=30, unique=True)),
                ('resto_owner', models.CharField(max_length=30)),
                ('description', models.TextField(blank=True, null=True)),
                ('opening_time', models.TimeField()),
                ('closing_time', models.TimeField()),
                ('location', models.CharField(default='Unknown Location', max_length=255)),
                ('image', models.ImageField(blank=True, null=True, upload_to='restaurant_images/')),
                ('cuisine_type', models.ManyToManyField(to='restaurants.cuisinetype')),
            ],
        ),
    ]
