from django.db import models
from users.models import User
from hobbies.models import Hobbies
from groups.models import Group

# Create your models here.


class Link(models.Model):
    name = models.CharField(max_length=200)
    link = models.URLField(max_length=200)
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=models.CASCADE)
    is_group = models.ForeignKey(Group, null=True, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.hobby}: {self.name} - {self.link}'
