# Generated by Django 3.2.9 on 2021-11-28 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hobbies', '0004_hobbies_hobby_group'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hobbies',
            old_name='hobby_group',
            new_name='hobby_category',
        ),
    ]
