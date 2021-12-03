from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Group
from hobbies.models import Hobbies
from .serializer import GroupSerializer
from users.models import User


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.kwargs.get('hobby', None)
        print(hobby_name)
        if hobby_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize()).pk
            groups = Group.objects.filter(hobby=hobby_id)
            return groups
        else:
            if self.request.user.is_superuser:
                return Group.objects.all()

    def create(self, request, *args, **kwargs):
        hobby_name = self.kwargs.get('hobby', None)
        name = self.request.data['name']
        description = self.request.data['description']
        enrollment_status = self.request.data['enrollment_status']
        user_id = self.request.data['group_creator']

        if hobby_name:
            user_obj = User.objects.get(id=int(user_id))
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            new_group = Group.objects.create(
                name=name, description=description, enrollment_status=enrollment_status, hobby=hobby_obj, group_creator=user_obj)
            new_group.save()
            return Response({"success": "Group has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        hobby_name = self.kwargs.get('hobby', None)
        group_id = self.kwargs.get('pk', None)
        name = self.request.data['name']
        description = self.request.data['description']
        enrollment_status = self.request.data['enrollment_status']
        user_id = self.request.data['group_creator']

        if hobby_name and group_id:
            user_obj = User.objects.get(id=user_id)
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            updated_group = Group.objects.filter(id=group_id).update(
                name=name, description=description, enrollment_status=enrollment_status, hobby=hobby_obj, group_creator=user_obj)
            return Response({"success": "Group has been updated"}, status=status.HTTP_200_OK)
