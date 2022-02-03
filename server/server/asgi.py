import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
from django.core.asgi import get_asgi_application

from users.consumers import NotificationConsumer
from message.consumer import MessageConsumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

application = ProtocolTypeRouter({
    # Django's ASGI application to handle traditional HTTP requests
    "http": get_asgi_application(),

    # WebSocket chat handler
    "websocket": AuthMiddlewareStack(
        URLRouter([
            url(r"^ws/notifications/(?P<currentHobby>\w+)/$",
                NotificationConsumer.as_asgi()),
            url(r"^ws/messages/(?P<userId>\w+)/$",
                MessageConsumer.as_asgi())
        ])
    ),
})
