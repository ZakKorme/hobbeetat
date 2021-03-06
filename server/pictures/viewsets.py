from posixpath import expanduser
from rest_framework.response import Response
from rest_framework import request, viewsets, parsers, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from groups.models import Group
from users.models import User
import json


from hobbies.models import Hobbies
from .models import Picture
from .serializer import PictureSerializer

# Create your views here.


class GroupPictureViewSet(viewsets.ModelViewSet):

    serializer_class = PictureSerializer
    parser_classes = [parsers.MultiPartParser,
                      parsers.FormParser, parsers.FileUploadParser]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        group_name = self.request.GET.get('group')

        if hobby_name and group_name:
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            group_obj = Group.objects.filter(
                name=group_name, hobby=hobby_obj).first()

            if hobby_obj and group_obj:
                results = Picture.objects.filter(hobby=hobby_obj,
                                                 is_group=group_obj)
                return results

        else:
            return Picture.objects.all()

    def create(self, *args, **kwargs):
        # body_unicode = self.request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        body = self.request.data
        print(body)
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
                new_picture = Picture.objects.create(
                    name=name, file=file, author=author_obj, hobby=hobby_obj, is_group=group_obj)
                return Response({"success": "Picture has been created"}, status=status.HTTP_201_CREATED)


class HobbyPictureViewSet(viewsets.ModelViewSet):

    serializer_class = PictureSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')

        if hobby_name:
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            if hobby_obj:
                results = Picture.objects.filter(
                    hobby=hobby_obj)
                return results
        else:
            return Picture.objects.all()
