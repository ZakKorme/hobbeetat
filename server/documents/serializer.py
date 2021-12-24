from users.serializers import UserSerializer
from groups.serializer import GroupSerializer
from .models import Document
from rest_framework import serializers


class DocumentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    is_group = GroupSerializer()

    class Meta:
        model = Document
        fields = '__all__'
