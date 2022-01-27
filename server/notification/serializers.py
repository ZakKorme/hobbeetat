from .models import Notification, User
from rest_framework import serializers
from users.serializers import UserSerializer
from posts.serializer import PostSerializer


class UserNotificationSerializer(serializers.Serializer):
    TYPE_CHOICES = (
        (1, "create"),
        (2, "like"),
        (3, "share"),
        (4, "comment")
    )

    id = serializers.IntegerField()
    creator = UserSerializer()
    is_seen = serializers.BooleanField(read_only=True)
    object = PostSerializer()
    type = serializers.ChoiceField(TYPE_CHOICES)
    created_on = serializers.DateTimeField()

    class Meta:
        model = Notification
        fields = '__all__'
