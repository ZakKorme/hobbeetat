from .models import Hobbies
from rest_framework import serializers


class HobbiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobbies
        fields = ['id', 'title', 'description', 'number_of_members', ]
