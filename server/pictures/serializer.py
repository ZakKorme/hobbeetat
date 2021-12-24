from users.serializers import UserSerializer
from groups.serializer import GroupSerializer
from .models import Picture
from rest_framework import serializers


class PictureSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    is_group = GroupSerializer()

    class Meta:
        model = Picture
        fields = '__all__'
