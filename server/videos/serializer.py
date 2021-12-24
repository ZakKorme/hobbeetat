from users.serializers import UserSerializer
from groups.serializer import GroupSerializer
from .models import Video
from rest_framework import serializers


class VideoSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    is_group = GroupSerializer()

    class Meta:
        model = Video
        fields = '__all__'
