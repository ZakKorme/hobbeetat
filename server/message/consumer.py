from channels.generic.websocket import AsyncWebsocketConsumer
import json


class MessageConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # Called on connection.
        self.room_name = self.scope["url_route"]["kwargs"]["userId"]
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(
            self.room_name, self.channel_name
        )

        await self.accept()
        await self.send(text_data=json.dumps(
            {"Success": "You are now connected to Messages"}))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

     # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'send_message',
                'message': message
            }
        )

    # Receive message from room group
    async def send_message(self, event):
        message_obj = json.loads(event['value'])
        recipient = message_obj['recipient']
        creator = message_obj['creator']
        message = message_obj['message']
        created_on = message_obj['created_on']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            self.room_name: {
                "creator": creator,
                "recipient": recipient,
                "message": message,
                "created_on": created_on
            }
        }))
