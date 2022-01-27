from channels.generic.websocket import AsyncWebsocketConsumer
import json
# from users.serializers import UserNotificationSerializer
from users.models import User


class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # Called on connection.
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(
            self.room_name, self.channel_name
        )

        await self.accept()
        await self.send(text_data=json.dumps(
            {"Success": "You are now connected to Notifications"}))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

     # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        notification = text_data_json['notification']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'send_notification',
                'notification': notification
            }
        )

    # Receive message from room group
    async def send_notification(self, event):
        notification_obj = json.loads(event['value'])

        creator = notification_obj['creator']
        notification = notification_obj['notification']
        url = notification_obj['url']
        type = notification_obj['type']
        created_on = notification_obj['created_on']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "notification": {
                "creator": creator,
                "notification": notification,
                "url": url,
                "type": type,
                "created_on": created_on
            }
        }))
