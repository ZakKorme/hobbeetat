# Generated by Django 3.2.9 on 2022-01-06 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ['created_on']},
        ),
    ]
