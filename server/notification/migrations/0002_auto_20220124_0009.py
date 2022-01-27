# Generated by Django 3.2.9 on 2022-01-24 00:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_post_group'),
        ('notification', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='object',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.post'),
        ),
        migrations.AddField(
            model_name='notification',
            name='type',
            field=models.IntegerField(choices=[(1, 'create'), (2, 'like'), (3, 'share'), (4, 'comment')], default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='notification',
            name='url',
            field=models.URLField(default=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='notification',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]