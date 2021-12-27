from django.db import models
from django.db.models.deletion import CASCADE
from hobbies.models import Hobbies
from groups.models import Group
# Create your models here.


class Event(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=80)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=CASCADE)
    group = models.ForeignKey(
        Group, blank=True, null=True, on_delete=CASCADE, db_column="group")

    def __str__(self):
        return f"{self.hobby} - {self.title}"
