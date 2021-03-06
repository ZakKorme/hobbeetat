# Generated by Django 3.2.9 on 2021-12-01 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hobbies', '0005_rename_hobby_group_hobbies_hobby_category'),
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterUniqueTogether(
            name='post',
            unique_together={('title', 'hobby')},
        ),
    ]
