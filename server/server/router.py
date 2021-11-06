from auth_users.viewsets import LoginViewSet, RefreshViewSet, RegistrationViewSet
from users.viewsets import UserViewSet
from rest_framework.routers import SimpleRouter


router = SimpleRouter()


# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')


# USER
router.register(r'user', UserViewSet, basename='user')


urlpatterns = [
    *router.urls
]
