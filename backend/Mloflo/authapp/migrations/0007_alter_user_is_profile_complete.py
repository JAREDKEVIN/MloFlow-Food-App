# Generated by Django 3.2.8 on 2023-08-25 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0006_auto_20230825_1009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_profile_complete',
            field=models.BooleanField(default=False),
        ),
    ]
