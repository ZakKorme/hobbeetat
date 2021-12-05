from users.serializers import UserSerializer
from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'hobby', 'content', 'created_on']
