from users.models import User
from django.test import TestCase
import sys
sys.path.append("...")


class BaseTest(TestCase):
    def setUp(self):
        self.register_url = "http://127.0.0.1:8000/api/v1/auth/register/"
        self.login_url = "http://127.0.0.1:8000/api/v1/auth/login/"
        self.user = {
            "first_name": "first_name_test1",
            "last_name": "last_name_test1",
            "email": "testHobbeetat@gmail.com",
            "password": "test12345",
            "gender": "M",
            "date_of_birth": "1900-07-01",
        }
        self.user_short_password = {
            "first_name": "first_name_test1",
            "last_name": "last_name_test1",
            "email": "testHobbeetat@gmail.com",
            "password": "123",
            "gender": "M",
            "date_of_birth": "1900-07-01",

        }
        self.user_invalidEmail = {
            "first_name": "first_name_test1",
            "last_name": "last_name_test1",
            "email": "testHobbeetat.com",
            "password": "123",
            "gender": "M",
            "date_of_birth": "1900-07-01",

        }
        return super().setUp()


class RegisterTest(BaseTest):
    def test_register_user(self):
        response = self.client.post(
            self.register_url, self.user, format='json')
        self.assertEqual(response.status_code, 201)

    def test_register_user_short_password(self):
        response = self.client.post(
            self.register_url, self.user_short_password, format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_user_invalidEmail(self):
        response = self.client.post(
            self.register_url, self.user_invalidEmail, format='json')
        self.assertEqual(response.status_code, 400)


class LoginTest(BaseTest):
    def test_login_success(self):
        self.client.post(self.register_url, self.user, format='json')
        user = User.objects.filter(email=self.user['email']).first()
        user.is_confirmed = True
        user.save()

        response = self.client.post(self.login_url, self.user, format='json')
        self.assertEqual(response.status_code, 200)

    def test_login_without_VerifiedEmail(self):
        self.client.post(self.register_url, self.user, format='json')
        response = self.client.post(self.login_url, self.user, format='json')
        self.assertEqual(response.status_code, 400)

    def test_login_without_email(self):
        response = self.client.post(self.register_url, {
            'password': '12345678'}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_login_without_password(self):
        response = self.client.post(self.register_url, {
            'email': 'testHobbeetat@gmail.com'}, format='json')
        self.assertEqual(response.status_code, 400)
