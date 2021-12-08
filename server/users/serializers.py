from .models import User
from rest_framework import serializers
from hobbies.serializer import HobbiesSerializer


class UserSerializer(serializers.ModelSerializer):
    last_accessed_hobby = HobbiesSerializer()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'gender', 'date_of_birth',
                  'is_active', 'is_staff', 'is_confirmed', 'date_joined', 'last_accessed_hobby']
