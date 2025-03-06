# Generated by Django 5.1.6 on 2025-03-02 07:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_user_contact_no_alter_user_email_address_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RestaurantOwner',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.user')),
                ('resto_name', models.CharField(max_length=30, unique=True)),
            ],
            bases=('users.user',),
        ),
    ]
