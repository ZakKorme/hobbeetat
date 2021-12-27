# Generated by Django 3.2.9 on 2021-12-27 14:42

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('pictures', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='picture',
            old_name='picture',
            new_name='link',
        ),
        migrations.AddField(
            model_name='picture',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='picture',
            name='modified_on',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
