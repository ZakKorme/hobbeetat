from django.db import models
from django.db.models.deletion import CASCADE
from hobbies.models import Hobbies
import users.models
# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=80)
    html = models.TextField()
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=CASCADE)
    user = models.ForeignKey(
        "users.User", null=True, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return f"{self.title} - {self.hobby}"
