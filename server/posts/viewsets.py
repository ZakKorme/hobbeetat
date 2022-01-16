from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.serializers import UserSerializer
from users.models import User_Hobby
from .models import Post
from hobbies.models import Hobbies
from .serializer import PostSerializer
from users.models import User
from groups.models import Group
from notifications.signals import notify


class HobbyPostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        posts = None
        if hobby_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize()).pk
            posts = Post.objects.filter(
                hobby=hobby_id).filter(group__isnull=True)
            return posts
        else:
            if self.request.user.is_superuser:
                return Post.objects.all()

    def create(self, request, *args, **kwargs):
        hobby_name = self.request.GET.get('hobby')
        title = self.request.data['title']
        author = self.request.data['author']
        content = self.request.data['content']

        if hobby_name:
            user_obj = User.objects.get(id=int(author))
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name)
            new_post = Post.objects.create(
                title=title, author=user_obj, hobby=hobby_obj, content=content)
            new_post.save()

            # Notification: List of Users
            hobby_users = list(User_Hobby.objects.filter(
                user_hobbyTitle=hobby_obj).values('user_id'))
            users_to_notify = [User.objects.get(
                id=user['user_id']) for user in hobby_users]
            notify.send(user_obj, recipient=users_to_notify,
                        verb="created a post")

            return Response({"success": "Post has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        hobby_name = self.request.GET.get('hobby')
        post_id = self.request.GET.get('post_id')
        title = self.request.data['title']
        author = self.request.data['author']
        content = self.request.data['content']

        if hobby_name and post_id:
            user_obj = User.objects.get(id=author)
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            updated_post = Post.objects.filter(id=post_id).update(
                title=title, author=user_obj, hobby=hobby_obj, content=content)

            return Response({"success": "Post has been updated"}, status=status.HTTP_200_OK)


class GroupPostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.request.GET.get('hobby')
        group_name = self.request.GET.get('group')
        posts = None
        if group_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize()).pk
            group_id = Group.objects.filter(
                hobby=hobby_id).get(name=group_name).pk
            posts = Post.objects.filter(hobby=hobby_id).filter(group=group_id)
            return posts
        else:
            if self.request.user.is_superuser:
                return Post.objects.all()

    def create(self, request, *args, **kwargs):
        group_name = self.request.GET.get('group')
        title = self.request.data['title']
        author = self.request.data['author']
        content = self.request.data['content']

        if group_name:
            user_obj = User.objects.get(id=int(author))
            hobby_obj = Hobbies.objects.get(
                hobby_title=group_name.capitalize())
            new_post = Post.objects.create(
                title=title, author=user_obj, hobby=hobby_obj, content=content)
            new_post.save()
            return Response({"success": "Post has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        group_name = self.request.GET.get('group')
        post_id = self.kwargs.get('pk', None)
        title = self.request.data['title']
        author = self.request.data['author']
        content = self.request.data['content']

        if group_name and post_id:
            user_obj = User.objects.get(id=author)
            hobby_obj = Hobbies.objects.get(
                hobby_title=group_name.capitalize())
            updated_post = Post.objects.filter(id=post_id).update(
                title=title, author=user_obj, hobby=hobby_obj, content=content)

            return Response({"success": "Post has been updated"}, status=status.HTTP_200_OK)
