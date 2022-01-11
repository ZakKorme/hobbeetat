from rest_framework import viewsets, status, parsers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Event
from hobbies.models import Hobbies
from .serializer import EventSerializer
from users.models import User
from groups.models import Group
import json


class HobbyEventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        if hobby_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize()).pk
            events = Event.objects.filter(
                hobby=hobby_id).filter(group__isnull=True)
            return events
        else:
            if self.request.user.is_superuser:
                return Event.objects.all()

    def create(self, request, *args, **kwargs):
        body_unicode = self.request.body.decode('utf-8')
        body = json.loads(body_unicode)

        hobby_name = body['hobby']
        title = body['title']
        description = body['description']
        date = body['date']
        start_time = body['startTime']
        end_time = body['endTime']
        address = body['address']
        city = body['city']
        state = body['state']
        zip = body['zip']
        is_online = body['isOnline']
        event_creator = body['eventCreator']
        price = body['price']
        img = body['img']
        file = body['file']

        if hobby_name:
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            user_obj = User.objects.filter(id=event_creator).first()
            new_event = Event.objects.create(
                title=title, description=description, date=date, start_time=start_time, end_time=end_time, address=address,
                hobby=hobby_obj, city=city, zip=zip, state=state, is_online=is_online, event_creator=user_obj, price=price, img=img, file=file)
            new_event.save()
            return Response({"success": "Event has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        hobby_name = self.request.GET.get('hobby')
        event_id = self.request.GET.get('event_id')
        title = self.request.data['title']
        description = self.request.data['description']
        date = self.request.data['date']
        start_time = self.request.data['start_time']
        end_time = self.request.data['end_time']
        location = self.request.data['location']
        group = self.request.data['group']

        if hobby_name and event_id:
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            if hobby_obj:
                updated_group = Event.objects.filter(id=event_id).update(
                    title=title, description=description, date=date, start_time=start_time, end_time=end_time, location=location, hobby=hobby_obj, group=group)
                return Response({"success": "Event has been updated"}, status=status.HTTP_200_OK)


class GroupEventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        group_name = self.request.GET.get('group')
        if hobby_name and group_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name).pk
            group_id = Group.objects.get(hobby=hobby_id, name=group_name).pk
            if hobby_id and group_id:
                events = Event.objects.filter(
                    hobby=hobby_id).filter(group=group_id)
                return events
        else:
            if self.request.user.is_superuser:
                return Event.objects.all()

    def create(self, request, *args, **kwargs):
        body_unicode = self.request.body.decode('utf-8')
        body = json.loads(body_unicode)

        hobby_name = body['hobby']
        title = body['title']
        description = body['description']
        date = body['date']
        start_time = body['startTime']
        end_time = body['endTime']
        address = body['address']
        city = body['city']
        state = body['state']
        zip = body['zip']
        is_online = body['isOnline']
        group = body['group']
        event_creator = body['eventCreator']
        price = body['price']
        img = body['img']
        file = body['file']

        if hobby_name:
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name)
            group_obj = Group.objects.filter(hobby=hobby_obj).get(name=group)
            user_obj = User.objects.filter(id=event_creator).first()
            new_event = Event.objects.create(
                title=title, description=description, date=date, start_time=start_time, end_time=end_time, address=address, hobby=hobby_obj,
                group=group_obj, city=city, zip=zip, state=state, is_online=is_online, event_creator=user_obj, price=price, img=img, file=file)
            new_event.save()
            return Response({"success": "Event has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        hobby_name = self.request.GET.get('hobby')
        event_id = self.request.GET.get('event_id')
        title = self.request.data['title']
        description = self.request.data['description']
        date = self.request.data['date']
        start_time = self.request.data['start_time']
        end_time = self.request.data['end_time']
        location = self.request.data['location']
        group = self.request.data['group']

        if hobby_name and event_id:
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            if hobby_obj:
                updated_group = Event.objects.filter(id=event_id).update(
                    title=title, description=description, date=date, start_time=start_time, end_time=end_time, location=location, hobby=hobby_obj, group=group)
                return Response({"success": "Event has been updated"}, status=status.HTTP_200_OK)
