from auth_users.viewsets import LoginViewSet, RefreshViewSet, RegistrationViewSet, EmailConfirmationViewSet
from hobbies.viewsets import HobbiesViewSet
from posts.viewsets import PostViewSet
from events.viewsets import EventViewSet
from documents.viewsets import GroupDocumentViewSet, HobbyDocumentViewSet
from users.viewsets import UserViewSet
from groups.viewsets import GroupViewSet
from videos.viewsets import GroupVideoViewSet, HobbyVideoViewSet
from pictures.viewsets import GroupPictureViewSet, HobbyPictureViewSet
from rest_framework.routers import SimpleRouter


router = SimpleRouter()


# AUTHENTICATION

router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# POSTS
router.register(
    r'auth/posts/(?P<hobby>[A-Za-z0-9_-]+)', PostViewSet, basename="auth-posts")
router.register(r'auth/posts', PostViewSet,
                basename="auth-get-all-posts")

# GROUPS
router.register(
    r'auth/groups/(?P<hobby>[A-Za-z0-9_-]+)', GroupViewSet, basename='auth-groups')
router.register(r'auth/groups', GroupViewSet, basename="auth-all-groups")

# EVENTS
router.register(
    r'auth/events/(?P<hobby>[A-Za-z0-9_-]+)', EventViewSet, basename='auth-events')
router.register(r'auth/events', EventViewSet, basename="auth-all-events")

# UPDATE LAST ACCESSED USER HOBBY
router.register(r'auth/users', UserViewSet, basename='auth-users')

# USER
router.register(r'users', UserViewSet, basename='user')

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

urlpatterns = [
    *router.urls
]
