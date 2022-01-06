from django.db.models import base
from auth_users.viewsets import LoginViewSet, RefreshViewSet, RegistrationViewSet, EmailConfirmationViewSet
from hobbies.viewsets import HobbiesViewSet
from posts.viewsets import HobbyPostViewSet, GroupPostViewSet
from events.viewsets import HobbyEventViewSet, GroupEventViewSet
from documents.viewsets import GroupDocumentViewSet, HobbyDocumentViewSet
from notes.viewsets import NoteViewSet
from users.viewsets import UserViewSet, UserUpdateGroupViewSet, UserUpdateHobbyViewSet
from groups.viewsets import GroupViewSet
from videos.viewsets import GroupVideoViewSet, HobbyVideoViewSet
from pictures.viewsets import GroupPictureViewSet, HobbyPictureViewSet
from links.viewsets import GroupLinkViewSet, HobbyLinkViewSet
from rest_framework.routers import SimpleRouter


router = SimpleRouter()


# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# GROUPS
router.register(
    r'auth/groups/(?P<hobby>[A-Za-z0-9_-]+)', GroupViewSet, basename='auth-groups')
router.register(r'auth/groups', GroupViewSet, basename="auth-all-groups")

# EVENTS
router.register(
    r'auth/events/hobby', HobbyEventViewSet, basename='auth-hobby-events')
router.register(r'auth/events/groups', GroupEventViewSet,
                basename="auth-group-events")

# UPDATE LAST ACCESSED USER HOBBY AND GROUP
router.register(r'auth/users/hobby', UserUpdateHobbyViewSet,
                basename='auth-users-update-hobby')
router.register(r'auth/users/group', UserUpdateGroupViewSet,
                basename='auth-users-update-group')

# USER
router.register(r'users', UserViewSet, basename='user')


# POSTS
router.register(r'auth/posts/hobby', HobbyPostViewSet,
                basename="auth-hobby-posts")
router.register(r'auth/posts/groups', GroupPostViewSet,
                basename="auth-group-posts")


# EMAIL CONFIRMATION
router.register(r'^email-confirmation/(?P<uidb64>[A-Za-z0-9_-]+)/(?P<token>[A-Za-z0-9_-]+)',
                EmailConfirmationViewSet, basename='auth-confirmation')

# HOBBIES
router.register(r'hobbies', HobbiesViewSet, basename="hobby")

# VIDEO - GROUPS + HOBBY
router.register(r'auth/videos/groups', GroupVideoViewSet,
                basename='auth-groups-videos')
router.register(r'auth/videos/hobby', HobbyVideoViewSet,
                basename='auth-hobby-videos')
# PICTURE - GROUP + HOBBY
router.register(r'auth/pictures/groups', GroupPictureViewSet,
                basename="auth-groups-pictures")
router.register(r'auth/pictures/hobby', HobbyPictureViewSet,
                basename="auth-hobby-pictures")
# DOCUMENT - GROUP + HOBBY
router.register(r'auth/documents/groups', GroupDocumentViewSet,
                basename="auth-groups-documents")
router.register(r'auth/documents/hobby', HobbyDocumentViewSet,
                basename="auth-hobby-documents")
# LINK - GROUP + HOBBY
router.register(r'auth/links/groups', GroupLinkViewSet,
                basename="auth-groups-links")
router.register(r'auth/links/hobby', HobbyLinkViewSet,
                basename="auth-hobby-links")

# NOTES
router.register(r'auth/notes', NoteViewSet, basename="auth-notes")


urlpatterns = [
    *router.urls
]
