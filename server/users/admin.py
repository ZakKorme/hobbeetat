from django.contrib import admin
from .models import User, User_Hobby, User_Group

# Register your models here.
admin.site.register(User)
admin.site.register(User_Hobby)
admin.site.register(User_Group)
