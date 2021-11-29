from django.db import models


class Hobbies(models.Model):
    hobby_title = models.CharField(max_length=80)
    hobby_description = models.CharField(max_length=10000)
    hobby_category = models.CharField(max_length=80)
    number_of_members = models.IntegerField()

    def __str__(self):
        return f"{self.hobby_title}"
