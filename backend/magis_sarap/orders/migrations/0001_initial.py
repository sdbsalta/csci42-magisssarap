# Generated by Django 5.1.6 on 2025-03-16 10:56

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Out for Delivery', 'Out for Delivery'), ('Delivered', 'Delivered')], max_length=50)),
                ('delivery_location', models.CharField(blank=True, help_text='Please follow proper naming conventions (e.g., CTC313, etc.) for the delivery address.', max_length=255, null=True)),
                ('estimated_time', models.DateTimeField(blank=True, null=True)),
                ('delivered_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.CharField(editable=False, max_length=20, unique=True)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Order Placed', 'Order Placed'), ('Order Confirmed', 'Order Confirmed'), ('Order Cancelled', 'Order Cancelled'), ('Preparing Order', 'Preparing Order'), ('Ready for Pick Up', 'Ready for Pick Up'), ('Out for Delivery', 'Out for Delivery'), ('Completed', 'Completed')], default='Order Placed', max_length=20)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('time_completed', models.DateTimeField(blank=True, null=True)),
                ('voucher_code', models.CharField(blank=True, max_length=50, null=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('notes', models.TextField(blank=True, help_text='Special instructions or requests from the customer.', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_id', models.CharField(editable=False, max_length=10, unique=True)),
                ('rating', models.PositiveIntegerField()),
                ('comment', models.TextField(blank=True, null=True)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
