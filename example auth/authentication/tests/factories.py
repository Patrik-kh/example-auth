import factory  # pylint: disable=import-error

from ..models import User


class UserFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = User

    first_name = 'Johnny'
    last_name = 'Doe'
    email = factory.Sequence(lambda n: 'johnny{0}@unknown.man'.format(n))
    # temp fix for tests, TODO: create custom auth backend
    password = factory.PostGenerationMethodCall('set_password', '1234')
