from .serializer import HobbiesSerializer
from .models import Hobbies
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated


class HobbiesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = HobbiesSerializer
    permission_classes = (IsAuthenticated, )
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Hobbies.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Hobbies.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
