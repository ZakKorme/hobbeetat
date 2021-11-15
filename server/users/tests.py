from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers, status
from django.test import TestCase, Client
from django.urls import reverse
from .models import User
from .serializers import UserSerializer


# initialize the APIClient app
client = Client()

# Create your tests here.


class GetAllUsersAuth(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name="first_name_test1",
            last_name="last_name_test1",
            email="testHobbeetat@gmail.com",
            password="test12345",
            gender="M",
            date_of_birth="1900-07-01",
        )
        self.user.is_staff = True
        self.user.is_superuser = True
        self.user.save()

    def test_get_all_users_with_auth(self):
        # Create A Token
        refresh = RefreshToken.for_user(self.user)
        access = str(refresh.access_token)
        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + access,
        }
        # get response
        response = client.get(
            'http://127.0.0.1:8000/api/v1/users/', format="json", **auth_headers)
        # get data from database
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        # make assertions
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetAllUsersWithoutAuth(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            first_name="first_name_test1",
            last_name="last_name_test1",
            email="testHobbeetat@gmail.com",
            password="test12345",
            gender="M",
            date_of_birth="1900-07-01",
        )

    def test_get_all_users_without_auth(self):
        # get response
        response = client.get('http://127.0.0.1:8000/api/v1/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
