from .serializers import UserSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    data = {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
    return data
