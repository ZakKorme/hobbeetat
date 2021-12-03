from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Post
from hobbies.models import Hobbies
from .serializer import PostSerializer
from users.models import User


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        hobby_name = self.kwargs.get('hobby', None)
        posts = None
        if hobby_name:
            hobby_id = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize()).pk
            posts = Post.objects.filter(hobby=hobby_id)
            return posts
        else:
            if self.request.user.is_superuser:
                return Post.objects.all()

    def create(self, request, *args, **kwargs):
        hobby_name = self.kwargs.get('hobby', None)
        title = self.request.data['title']
        author = self.request.data['author']
        content = self.request.data['content']

        if hobby_name:
            user_obj = User.objects.get(id=int(author))
            hobby_obj = Hobbies.objects.get(
                hobby_title=hobby_name.capitalize())
            new_post = Post.objects.create(
                title=title, author=user_obj, hobby=hobby_obj, content=content)
            new_post.save()
            return Response({"success": "Post has been created"}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        hobby_name = self.kwargs.get('hobby', None)
        post_id = self.kwargs.get('pk', None)
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
