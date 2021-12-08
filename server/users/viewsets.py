from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from hobbies.models import Hobbies
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated


# AUTHENTICATION REQUIRED: GET - All Users

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'put']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs['pk']
        hobby_name = self.request.data['last_accessed_hobby']
        if user_id and hobby_name:
            user_obj = User.objects.get(id=user_id)
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            if user_obj and hobby_obj:
                User.objects.filter(id=user_obj.pk).update(
                    last_accessed_hobby=hobby_obj)
                return Response({'Success': 'User last selected hobby has been updated.'}, status=status.HTTP_200_OK)
        return Response({'Failure': 'Invalid Format - please add UserID and HobbyID as reference.'}, status=status.HTTP_400_BAD_REQUEST)
