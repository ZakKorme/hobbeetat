from .models import Event
from rest_framework import serializers
from groups.serializer import GroupSerializer
from users.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    event_creator = UserSerializer()
    start_time = serializers.DateTimeField(format="%H:%M")
    end_time = serializers.DateTimeField(format="%H:%M")

    class Meta:
        model = Event
        fields = '__all__'
