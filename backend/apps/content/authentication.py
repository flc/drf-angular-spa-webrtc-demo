from django.contrib.auth.models import User
from django.conf import settings

from rest_framework import authentication
from rest_framework import exceptions


class DevOnlyMixin(object):

    def raise_if_dev(self):
        if not settings.DEBUG:
            raise exceptions.AuthenticationFailed(
                'DEBUG setting is set to False, use only in '
                'development environment.'
                )


class AdminAuthentication(DevOnlyMixin, BaseAuthentication):

    def authenticate(self, request):
        self.raise_if_dev()

        try:
            # gets the first superuser in the system
            user = User.objects.filter(is_superuser=True).order_by("id")[0]
        except IndexError:
            raise exceptions.AuthenticationFailed('No admin user.')

        return (user, None)


class UsernameAuthentication(DevOnlyMixin, BaseAuthentication):

    def authenticate(self, request):
        self.raise_if_dev()

        username = request.META.get('X_USERNAME')
        if not username:
            return None

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed(
                'No user with username: {}'.format(username)
                )

        return (user, None)
