from .models import Group
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'description',
                  'enrollment_status', 'hobby', 'group_creator']
