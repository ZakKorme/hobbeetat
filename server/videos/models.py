from django.db import models
from users.models import User
from hobbies.models import Hobbies
from groups.models import Group

# Create your models here.


class Video(models.Model):
    name = models.CharField(max_length=200)
    video = models.FileField(max_length=200)
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=models.CASCADE)
    is_group = models.ForeignKey(Group, null=True, on_delete=models.CASCADE)
