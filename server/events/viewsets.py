from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Event
from hobbies.models import Hobbies
from .serializer import EventSerializer
from users.models import User


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.kwargs.get('hobby', None)
        if hobby_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize()).pk
            events = Event.objects.filter(hobby=hobby_id)
            return events
        else:
            if self.request.user.is_superuser:
                return Event.objects.all()

    def create(self, request, *args, **kwargs):
        hobby_name = self.kwargs.get('hobby', None)
        title = self.request.data['title']
        description = self.request.data['description']
        date = self.request.data['date']
        start_time = self.request.data['start_time']
        end_time = self.request.data['end_time']
        location = self.request.data['location']
        group_specific = self.request.data['group_specific']

        if hobby_name:
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            new_event = Event.objects.create(
                title=title, description=description, date=date, start_time=start_time, end_time=end_time, location=location, hobby=hobby_obj, group_specific=group_specific)
            new_event.save()
            return Response({"success": "Group has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        hobby_name = self.kwargs.get('hobby', None)
        event_id = self.kwargs.get('pk', None)
        title = self.request.data['title']
        description = self.request.data['description']
        date = self.request.data['date']
        start_time = self.request.data['start_time']
        end_time = self.request.data['end_time']
        location = self.request.data['location']
        group_specific = self.request.data['group_specific']

        if hobby_name and event_id:
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            updated_group = Event.objects.filter(id=event_id).update(
                title=title, description=description, date=date, start_time=start_time, end_time=end_time, location=location, hobby=hobby_obj, group_specific=group_specific)
            return Response({"success": "Group has been updated"}, status=status.HTTP_200_OK)
