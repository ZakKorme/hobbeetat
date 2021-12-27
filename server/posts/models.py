from django.db import models
from django.db import models
from users.models import User
from hobbies.models import Hobbies
from groups.models import Group


class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    hobby = models.ForeignKey(Hobbies, null=True, on_delete=models.CASCADE)
    content = models.TextField()
    group = models.ForeignKey(
        Group, blank=True, null=True, on_delete=models.CASCADE, db_column="group")
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_on"]
        unique_together = ('title', 'hobby')

    def __str__(self):
        return f"{self.hobby} - {self.title}"
