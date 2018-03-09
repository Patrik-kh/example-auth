import json

from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIRequestFactory
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework_jwt import utils

from .factories import UserFactory
from ..models import User
from ..views import UserViewSet


factory = APIRequestFactory()  # pylint: disable=invalid-name


class TestUserEndpoints(TestCase):
    """
    Test endpoints for user (agent or contributor) role.
    """

    def setUp(self):
        self.user = UserFactory()
        payload = utils.jwt_payload_handler(self.user)
        self.token = utils.jwt_encode_handler(payload)

    def test_get_unauth_user_401(self):
        user = UserFactory()
        request = factory.get(reverse('auth:user-detail', args=[user.pk]))
        response = UserViewSet.as_view({'get': 'retrieve'})(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            json.loads(response.content.decode('utf-8')).get('detail'),
            'Authentication credentials were not provided.'
        )

    def test_get_correct_data_of_a_user(self):
        user = UserFactory()
        request = factory.get(
            reverse('auth:user-detail', kwargs={'pk': user.pk}),
            HTTP_AUTHORIZATION='JWT {}'.format(self.token)
        )
        request.user = self.user
        response = UserViewSet.as_view({'get': 'retrieve'})(request, pk=user.id)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(
            response.content.decode('utf-8'),
            JSONRenderer().render({
                'id': user.pk,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'get_full_name': user.get_full_name(),
                'is_active': True,
                'last_login': None,
                'email': user.email,
                'is_staff': False,
                'date_joined': user.date_joined
            }).decode('utf-8')
        )

    def test_post_user_data(self):
        email = 'grozicki@akabest.com'
        request = factory.post(
            reverse('auth:user-list'),
            json.dumps({
                'first_name': 'Tomas',
                'last_name': 'Grozicki',
                'email': email
            }),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(self.token)
        )
        request.user = self.user
        response = UserViewSet.as_view({'post': 'create'})(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        parsed = json.loads(response.content.decode('utf-8'))
        self.assertEqual(parsed.get('email'), email)
        self.assertIsNotNone(parsed.get('id'))
        self.assertEqual(User.objects.count(), 2)

    def test_put_user_data(self):
        first_name = 'Ulrich'
        user = UserFactory()
        request = factory.put(
            reverse('auth:user-detail', kwargs={'pk': user.pk}),
            json.dumps({
                'first_name': first_name,
                'last_name': user.last_name,
                'email': user.email
            }),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(self.token)
        )
        request.user = self.user
        response = UserViewSet.as_view({'put': 'update'})(request, pk=user.id)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content.decode('utf-8'))
        self.assertEqual(parsed.get('email'), user.email)
        self.assertEqual(parsed.get('first_name'), first_name)
        self.assertEqual(parsed.get('id'), user.id)
        self.assertEqual(User.objects.count(), 2)  # PUT is not POST

    def test_patch_user_data(self):
        last_name = 'Gilmour'
        user = UserFactory()
        request = factory.patch(
            reverse('auth:user-detail', kwargs={'pk': user.pk}),
            json.dumps({'last_name': last_name}),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(self.token)
        )
        request.user = self.user
        response = UserViewSet.as_view({'patch': 'partial_update'})(request, pk=user.id)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content.decode('utf-8'))
        self.assertEqual(parsed.get('last_name'), last_name)
        self.assertEqual(parsed.get('id'), user.id)

    def test_delete_user(self):
        user = UserFactory()
        request = factory.delete(
            reverse('auth:user-detail', kwargs={'pk': user.pk}),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(self.token)
        )
        request.user = self.user
        response = UserViewSet.as_view({'delete': 'destroy'})(request, pk=user.id)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 1)  # just a user created this request
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(pk=user.pk)

    def test_get_list_of_users(self):
        users = UserFactory.create_batch(5)
        request = factory.get(
            reverse('auth:user-list'),
            HTTP_AUTHORIZATION='JWT {}'.format(self.token)
        )
        request.user = self.user
        response = UserViewSet.as_view({'get': 'list'})(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(json.loads(response.content.decode('utf-8'))['results']),
            len(users) + 1
        )
