# Generated by Django 3.2.9 on 2021-11-30 18:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('hobbies', '0005_rename_hobby_group_hobbies_hobby_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('description', models.TextField()),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('location', models.CharField(max_length=80)),
                ('group_specific', models.BooleanField(default=False)),
                ('hobby', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hobbies.hobbies')),
            ],
        ),
    ]