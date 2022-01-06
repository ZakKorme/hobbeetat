from users.serializers import UserSerializer
from groups.serializer import GroupSerializer
from .models import Link
from rest_framework import serializers


class LinkSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    is_group = GroupSerializer()

    class Meta:
        model = Link
        fields = '__all__'
