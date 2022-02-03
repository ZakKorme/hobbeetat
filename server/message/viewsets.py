from email.errors import MessageParseError
from rest_framework.response import Response
from .serializers import MessageSerializer
from .models import Message
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from users.models import User


# AUTHENTICATION REQUIRED: GET - All Users

class MessageViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'put']
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self, *args, **kwargs):
        id = self.lookup_url_kwarg['id']
        if id:
            user_obj = User.objects.get(id=id)
            if user_obj:
                return Message.objects.filter(user=user_obj)

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Message.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
