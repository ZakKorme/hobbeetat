from .models import Event
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description',
                  'date', 'start_time', 'end_time', 'location', 'hobby', 'group_specific']
