# Generated by Django 3.2.9 on 2022-01-24 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0002_auto_20220124_0009'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default='2021-1-1'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='notification',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
