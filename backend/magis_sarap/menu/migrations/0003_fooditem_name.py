# Generated by Django 5.1.6 on 2025-03-15 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='fooditem',
            name='name',
            field=models.CharField(default='Unknown Food Item', max_length=100),
        ),
    ]
