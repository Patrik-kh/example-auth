from django.test import TestCase

from .factories import UserFactory
from ..serializers import UserSerializer


class TestUserSerializer(TestCase):

    def test_get_valid_user_fields(self):
        user = UserFactory()
        serializer = UserSerializer(user)
        self.assertEqual(serializer.data.get('email'), user.email)
        self.assertEqual(serializer.data.get('id'), user.id)
        # we mustn't serialize and send password!
        self.assertIsNone(serializer.data.get('password'))
