
import json
from rest_framework.response import Response
from rest_framework import viewsets, parsers, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from groups.models import Group
from users.models import User
from hobbies.models import Hobbies
from .models import Video
from .serializer import VideoSerializer

# Create your views here.


class GroupVideoViewSet(viewsets.ModelViewSet):

    serializer_class = VideoSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        group_name = self.request.GET.get('group')

        if hobby_name and group_name:
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            group_obj = Group.objects.filter(
                name=group_name, hobby=hobby_obj).first()

            if hobby_obj and group_obj:
                results = Video.objects.filter(hobby=hobby_obj,
                                               is_group=group_obj)
                return results

        else:
            return Video.objects.all()

    def create(self, *args, **kwargs):
        body = self.request.data
        hobby_name = body['hobby']
        group_name = body['is_group']
        author_id = body['author']
        name = body['name']
        file = body['file']

        if hobby_name and group_name:
            hobby_obj = Hobbies.objects.filter(hobby_title=hobby_name).first()
            group_obj = Group.objects.get(
                hobby=hobby_obj, name=group_name)
            author_obj = User.objects.get(id=author_id)

            if hobby_obj and group_obj and author_obj:
                new_video = Video.objects.create(
                    name=name, file=file, author=author_obj, hobby=hobby_obj, is_group=group_obj)
                return Response({"success": "Video has been created"}, status=status.HTTP_201_CREATED)


class HobbyVideoViewSet(viewsets.ModelViewSet):

    serializer_class = VideoSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')

        if hobby_name:
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            if hobby_obj:
                results = Video.objects.filter(
                    hobby=hobby_obj)
                return results
        else:
            return Video.objects.all()
