from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import TextField
from hobbies.models import Hobbies
import users.models


STATUS = (("O", "Open"), ("I", "Invite Only"), ("C", "Closed"))


class Group(models.Model):
    name = models.CharField(max_length=80)
    description = TextField()
    enrollment_status = models.CharField(
        choices=STATUS, default="O", max_length=1)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=CASCADE)
    group_creator = models.ForeignKey(
        "users.User", null=True, on_delete=models.SET_NULL)
    img = models.FileField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.hobby}: {self.enrollment_status}"
