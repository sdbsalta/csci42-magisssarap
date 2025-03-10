# Generated by Django 5.1.6 on 2025-02-26 04:36

import users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_email_address_alter_user_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email_address',
            field=models.EmailField(error_messages={'invalid': 'Enter a valid Ateneo email.', 'unique': 'This Ateneo Student email has already been registered.'}, max_length=254, unique=True, validators=[users.models.email_validate]),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.IntegerField(error_messages={'unique': 'This Ateneo Student ID has already been registered.'}, primary_key=True, serialize=False, unique=True, validators=[users.models.user_id_validate]),
        ),
    ]
