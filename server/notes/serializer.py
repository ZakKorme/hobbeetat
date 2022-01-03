from users.serializers import UserSerializer
from .models import Note
from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Note
        fields = '__all__'
