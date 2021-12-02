import smtplib
import ssl
from django.http.request import validate_host
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status, serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken


from .serializer import LoginSerializer, RegisterSerializer, ConfirmationSerializer
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_str,  force_bytes,  force_text
from .utils import generate_token
from users.models import User, User_Hobby
from hobbies.models import Hobbies
from email.message import EmailMessage
from django.conf import settings
import threading


# Threading for email after user registration
class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        context = ssl.create_default_context()

        with smtplib.SMTP('smtp.gmail.com', port=587) as smtp:
            smtp.starttls(context=context)
            smtp.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
            smtp.send_message(self.email)


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        user = User.objects.filter(email=request.data['email']).first()

        if user.is_confirmed:
            try:
                serializer.is_valid(raise_exception=True)
            except TokenError as e:
                raise InvalidToken(e.args[0])

            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Please confirm email."}, status=status.HTTP_400_BAD_REQUEST)


# Sends user and email with token to active their account
def send_activation_email(user, request):
    current_site = get_current_site(request)
    email_subject = 'Active your account'
    email_body = render_to_string('acc_activate_email.html', {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user)

    })

    email = EmailMessage()
    email['Subject'] = email_subject
    email['From'] = settings.EMAIL_HOST_USER
    email['To'] = user.email
    email.set_content(email_body)
    EmailThread(email).start()


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Adds User's Hobbies to User_Hobby Model
        for hobby in request.data['hobbies']:
            hobby_instance = Hobbies.objects.get(hobby_title=hobby['title'])
            user_hobby_entry = User_Hobby.objects.create(
                user_id=user, user_hobbyTitle=hobby_instance)
            user_hobby_entry.save()

        send_activation_email(user, request)
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class EmailConfirmationViewSet(ModelViewSet, serializers.ModelSerializer):
    serializer_class = ConfirmationSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(request, *args, **kwargs):
        uidb64 = kwargs['uidb64']
        token = kwargs['token']
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

        except Exception as e:
            user = None

        if user and generate_token.check_token(user, token):
            user.is_confirmed = True
            user.save()

            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Token or Expired Token'}, status=status.HTTP_400_BAD_REQUEST)
