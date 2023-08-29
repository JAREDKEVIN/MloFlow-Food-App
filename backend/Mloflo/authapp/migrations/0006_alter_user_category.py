# Generated by Django 4.2.4 on 2023-08-26 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0005_alter_user_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='category',
            field=models.CharField(choices=[('customer', 'customer'), ('admin', 'admin'), ('vhef', 'chef'), ('vendor', 'vendor')], max_length=50),
        ),
    ]
