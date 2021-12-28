# Generated by Django 3.2.9 on 2021-12-24 22:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('hobbies', '0005_rename_hobby_group_hobbies_hobby_category'),
        ('groups', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('document', models.FileField(max_length=200, upload_to='')),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('hobby', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hobbies.hobbies')),
                ('is_group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='groups.group')),
            ],
        ),
    ]