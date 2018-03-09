from rest_framework.routers import DefaultRouter

from .views import UserViewSet


app_name = 'authentication'  # pylint: disable=invalid-name
router = DefaultRouter()  # pylint: disable=invalid-name

router.register(r'', UserViewSet)

urlpatterns = router.urls
