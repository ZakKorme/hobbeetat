# Generated by Django 3.2.9 on 2021-11-12 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hobbies', '0003_alter_hobbies_hobby_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='hobbies',
            name='hobby_group',
            field=models.CharField(default='General hobbies', max_length=80),
            preserve_default=False,
        ),
    ]
