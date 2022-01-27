from rest_framework.response import Response
from .serializers import UserNotificationSerializer
from .models import Notification
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from users.models import User


# AUTHENTICATION REQUIRED: GET - All Users

class NotificationViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'put']
    serializer_class = UserNotificationSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self, *args, **kwargs):
        id = self.lookup_url_kwarg['id']
        if id:
            user_obj = User.objects.get(id=id)
            if user_obj:
                return Notification.objects.filter(user=user_obj)

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Notification.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
