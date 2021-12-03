from auth_users.viewsets import LoginViewSet, RefreshViewSet, RegistrationViewSet, EmailConfirmationViewSet
from hobbies.viewsets import HobbiesViewSet
from posts.viewsets import PostViewSet
from users.viewsets import UserViewSet
from groups.viewsets import GroupViewSet
from rest_framework.routers import SimpleRouter


router = SimpleRouter()


# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
router.register(
    r'auth/posts/(?P<hobby>[A-Za-z0-9_-]+)', PostViewSet, basename="auth-posts")
router.register(r'auth/posts', PostViewSet,
                basename="auth-get-all-posts")

router.register(
    r'auth/groups/(?P<hobby>[A-Za-z0-9_-]+)', GroupViewSet, basename='auth-groups')
router.register(r'auth/groups', GroupViewSet, basename="auth-all-groups")


# USER
router.register(r'users', UserViewSet, basename='user')

# EMAIL CONFIRMATION
router.register(r'^email-confirmation/(?P<uidb64>[A-Za-z0-9_-]+)/(?P<token>[A-Za-z0-9_-]+)',
                EmailConfirmationViewSet, basename='auth-confirmation')

# HOBBIES
router.register(r'hobbies', HobbiesViewSet, basename="hobby")


urlpatterns = [
    *router.urls
]
