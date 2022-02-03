# Generated by Django 3.2.9 on 2022-01-27 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0004_auto_20220124_2002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.IntegerField(choices=[(1, 'create'), (2, 'like'), (3, 'share'), (4, 'comment'), (5, 'event'), (6, 'upload')]),
        ),
    ]