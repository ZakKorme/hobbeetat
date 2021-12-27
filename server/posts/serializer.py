from users.serializers import UserSerializer
from groups.serializer import GroupSerializer
from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    group = GroupSerializer()

    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'hobby',
                  'content', 'created_on', 'group']
