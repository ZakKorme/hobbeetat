# Generated by Django 3.2.9 on 2021-11-30 18:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hobbies', '0005_rename_hobby_group_hobbies_hobby_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('description', models.TextField()),
                ('enrollment_status', models.CharField(choices=[('O', 'Open'), ('I', 'Invite Only'), ('C', 'Closed')], default='O', max_length=1)),
                ('group_creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('hobby', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hobbies.hobbies')),
            ],
        ),
    ]
