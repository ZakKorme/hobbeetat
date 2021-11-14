from auth_users.viewsets import LoginViewSet, RefreshViewSet, RegistrationViewSet, EmailConfirmationViewSet
from hobbies.viewsets import HobbiesViewSet
from users.viewsets import UserViewSet
from rest_framework.routers import SimpleRouter


router = SimpleRouter()


# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')


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
