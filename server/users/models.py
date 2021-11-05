from typing import Type
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **kwards):
        """Create and return a user with an email, username, and password"""
        if username is None:
            raise TypeError("Users must have a username.")
        if email is None:
            raise ValueError("Users must have an email.")

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        """Create and return user with admin permissions"""
        if password is None:
            raise TypeError("Admin users must have a password")
        if email is None:
            raise TypeError("Admin users must have an email")
        if username is None:
            raise TypeError("Admin users must have a username")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_reported = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FILEDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
