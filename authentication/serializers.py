from rest_framework.serializers import ModelSerializer

from .models import User


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'get_full_name', 'is_active', 'last_login',
            'email', 'is_staff', 'date_joined',
        )
        read_only_fields = ('last_login', 'date_joined', 'is_staff', 'id', 'is_staff',)
