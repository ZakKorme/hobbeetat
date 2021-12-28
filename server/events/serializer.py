from .models import Event
from rest_framework import serializers
from groups.serializer import GroupSerializer
from users.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    event_creator = UserSerializer()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description',
                  'date', 'start_time', 'end_time', 'location', 'hobby', 'group', 'price', 'img', 'link', 'event_creator']
