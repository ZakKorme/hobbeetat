from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

from hobbies.models import Hobbies
from users.models import *


class TokenGenerator(PasswordResetTokenGenerator):

    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_confirmed))


generate_token = TokenGenerator()


def get_user_hobbies(user):
    user_hobbies = User_Hobby.objects.filter(
        user_id=user.pk).values('user_hobbyTitle')
    user_hobbies = list(user_hobbies)
    hobbies = []
    for hobby in user_hobbies:
        hobbies.append(str(Hobbies.objects.get(
            id=hobby['user_hobbyTitle'])))

    return hobbies
