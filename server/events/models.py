from django.db import models
from django.db.models.deletion import CASCADE
from hobbies.models import Hobbies
# Create your models here.


class Event(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=80)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=CASCADE)
    group_specific = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.hobby} - {self.title}"
