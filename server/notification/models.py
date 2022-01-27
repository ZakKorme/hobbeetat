from datetime import datetime
from tkinter import W
from django.db import models
from posts.models import Post
from rest_framework import serializers
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from users.models import User
from users.serializers import UserSerializer


class Notification(models.Model):
    TYPE_CHOICES = (
        (1, "create"),
        (2, "like"),
        (3, "share"),
        (4, "comment"),
        (5, "event"),
        (6, "upload")
    )
    recipient = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="recipient_notification")
    creator = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="creator_notification")
    notification = models.TextField(max_length=100)
    is_seen = models.BooleanField(default=False)
    url = models.URLField()
    type = models.IntegerField(choices=TYPE_CHOICES)
    object = models.ForeignKey(Post, null=True, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    # TAKE THIS TASK TO ASYNC NATIVE LIBRARY FOR PERFORMACE UPGRADE

    def save(self, *args, **kwargs):
        channel_layer = get_channel_layer()
        date_time = datetime.now()
        data = {
            "creator": UserSerializer(self.creator).data,
            "notification": self.notification,
            "url": self.url,
            "type": self.type,
            "created_on": date_time.isoformat()
        }
        async_to_sync(channel_layer.group_send)(
            "lobby", {
                'type': 'send_notification',
                'value': json.dumps(data)
            }
        )
        super(Notification, self).save(*args, **kwargs)

    def get_user_notifications(user):
        user_notifications = Notification.objects.filter(recipient=user)
        return user_notifications
