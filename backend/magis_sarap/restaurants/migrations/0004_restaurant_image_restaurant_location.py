# Generated by Django 5.1.7 on 2025-03-12 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0003_remove_restaurant_resto_owners_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='restaurant_images/'),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='location',
            field=models.CharField(default='Unknown Location', max_length=255),
        ),
    ]
