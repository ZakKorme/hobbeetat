from rest_framework.response import Response
from rest_framework import viewsets, parsers, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from groups.models import Group

from hobbies.models import Hobbies
from .models import Document
from .serializer import DocumentSerializer

# Create your views here.


class GroupDocumentViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer
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
                results = Document.objects.filter(
                    is_group=group_obj)
                return results

        else:
            return Document.objects.all()


class HobbyDocumentViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')

        if hobby_name:
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            if hobby_obj:
                results = Document.objects.filter(
                    hobby=hobby_obj)
                return results
        else:
            return Document.objects.all()
