from .models import Event
from rest_framework import serializers
from groups.serializer import GroupSerializer


class EventSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description',
                  'date', 'start_time', 'end_time', 'location', 'hobby', 'group']
