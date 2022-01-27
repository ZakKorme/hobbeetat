# Generated by Django 3.2.9 on 2022-01-10 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_rename_image_event_img'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='location',
        ),
        migrations.AddField(
            model_name='event',
            name='city',
            field=models.CharField(max_length=80, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='is_online',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='state',
            field=models.CharField(max_length=80, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='zip',
            field=models.IntegerField(null=True),
        ),
    ]