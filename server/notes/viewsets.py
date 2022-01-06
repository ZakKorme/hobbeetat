from django.shortcuts import render
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from hobbies.models import Hobbies
from users.models import User
import json

from .serializer import NoteSerializer
from .models import Note

# Create your views here.


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        user_id = self.request.GET.get('user')

        if hobby_name and user_id:
            hobby_obj = Hobbies.objects.get(hobby_title=hobby_name)
            user_obj = User.objects.get(pk=user_id)
            if hobby_obj and user_obj:
                return Note.objects.filter(user=user_obj).filter(hobby=hobby_obj)
        else:
            return Note.objects.all()

    def create(self, *args, **kwargs):
        body_unicode = self.request.body.decode('utf-8')
        body = json.loads(body_unicode)
        hobby_name = body['hobby']
        user_id = body['user']
        title = body['title']
        html = body['html']

        if hobby_name and user_id:
            hobby_obj = Hobbies.objects.filter(hobby_title=hobby_name).first()
            user_obj = User.objects.get(pk=user_id)

            if hobby_obj and user_obj:
                serializer = self.get_serializer(Note.objects.create(
                    hobby=hobby_obj, user=user_obj, title=title, html=html))
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({"error": "Note has not been created"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, *args, **kwargs):
        body_unicode = self.request.body.decode('utf-8')
        body = json.loads(body_unicode)
        title = body['title']
        html = body['html']
        note_id = self.kwargs['pk']

        if note_id:
            filtered_note = Note.objects.filter(id=note_id)
            updated_note = filtered_note.update(
                title=title, html=html)
            serializer = NoteSerializer(filtered_note, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"error": "Note has not been updated"}, status=status.HTTP_400_BAD_REQUEST)
