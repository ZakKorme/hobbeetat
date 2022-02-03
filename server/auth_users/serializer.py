from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from auth_users.utils import get_user_hobbies, get_user_groups
from groups.serializer import GroupSerializer
from notification.serializers import UserNotificationSerializer
from notification.models import Notification
from message.serializers import MessageSerializer
from message.models import Message
from users.serializers import UserSerializer
from users.models import User


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['hobbies'] = get_user_hobbies(self.user)
        data['groups'] = GroupSerializer(
            get_user_groups(self.user), many=True).data
        data['notifications'] = UserNotificationSerializer(
            Notification.get_user_notifications(user=self.user), many=True
        ).data
        data['messages'] = MessageSerializer(
            Message.get_user_messages(user=self.user), many=True).data
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class ConfirmationSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'is_confirmed']


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True)
    email = serializers.EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'password', 'email',
                  'is_active', 'is_staff', 'date_joined', 'gender', 'date_of_birth']

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
