from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from hobbies.models import Hobbies


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **kwargs):
        """Create and return a user with an email, username, and password"""
        if email is None:
            raise ValueError("Users must have an email.")

        user = self.model(email=self.normalize_email(
            email), first_name=kwargs.get('first_name'), last_name=kwargs.get('last_name'), date_of_birth=kwargs.get('date_of_birth'), gender=kwargs.get('gender'))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        """Create and return user with admin permissions"""
        if password is None:
            raise TypeError("Admin users must have a password")
        if email is None:
            raise TypeError("Admin users must have an email")

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(max_length=8)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_reported = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    is_confirmed = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FILEDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class User_Hobby(models.Model):
    user_id = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    user_hobbyTitle = models.ForeignKey(
        Hobbies, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.user_id} - {self.user_hobbyTitle}"
