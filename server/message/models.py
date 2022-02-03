from datetime import datetime
from django.db import models
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from users.models import User
from users.serializers import UserSerializer
from django.db.models import Q


class Message(models.Model):
    recipient = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="recipient_message")
    creator = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="creator_message")
    message = models.TextField(max_length=10000)
    is_seen = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    # TAKE THIS TASK TO ASYNC NATIVE LIBRARY FOR PERFORMACE UPGRADE

    def save(self, *args, **kwargs):
        channel_layer = get_channel_layer()
        date_time = datetime.now()
        room = str(self.recipient.pk)
        data = {
            "creator": UserSerializer(self.creator).data,
            "recipient": UserSerializer(self.recipient).data,
            "message": self.message,
            "is_seem": self.is_seen,
            "created_on": date_time.isoformat()
        }
        async_to_sync(channel_layer.group_send)(
            room, {
                'type': 'send_message',
                'value': json.dumps(data)
            }
        )
        super(Message, self).save(*args, **kwargs)

    def get_user_messages(user):
        user_notifications = Message.objects.filter(
            Q(recipient=user) | Q(creator=user))
        return user_notifications
