# Generated by Django 3.2.9 on 2022-02-02 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0006_auto_20220201_2212'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='is_seen',
            field=models.BooleanField(default=False),
        ),
    ]
