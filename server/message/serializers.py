from .models import Message
from rest_framework import serializers
from users.serializers import UserSerializer
from posts.serializer import PostSerializer


class MessageSerializer(serializers.Serializer):

    id = serializers.IntegerField()
    recipient = UserSerializer()
    creator = UserSerializer()
    is_seen = serializers.BooleanField(read_only=True)
    created_on = serializers.DateTimeField()
    message = serializers.CharField()

    class Meta:
        model = Message
        fields = '__all__'
