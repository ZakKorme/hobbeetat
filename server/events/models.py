from django.db import models
from django.db.models.deletion import CASCADE, SET_NULL
from hobbies.models import Hobbies
from groups.models import Group
from users.models import User
# Create your models here.


class Event(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    address = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=80, null=True)
    city = models.CharField(max_length=80, null=True)
    zip = models.IntegerField(null=True)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=CASCADE)
    group = models.ForeignKey(
        Group, blank=True, null=True, on_delete=CASCADE, db_column="group")
    event_creator = models.ForeignKey(
        User, blank=True, null=True, on_delete=SET_NULL)
    price = models.DecimalField(null=True, max_digits=6, decimal_places=2)
    img = models.FileField(null=True, blank=True)
    link = models.URLField(max_length=200, null=True, blank=True)
    is_online = models.BooleanField(null=False, blank=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.hobby} - {self.title}"
