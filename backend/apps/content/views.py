from django.contrib.auth.models import User, Group

from rest_framework import viewsets

from .serializers import (
    UserSerializer, ContentSerializer, NestedOwnerContentSerializer
    )
from .models import Content


class SerializerClassMethodOverrideMixin(object):
    serializer_class_method_overrides = {}

    def get_serializer_class(self):
        return self.serializer_class_method_overrides.get(
            self.request.method,
            super(SerializerClassMethodOverrideMixin, self).get_serializer_class()
            )


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ContentViewSet(SerializerClassMethodOverrideMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows videos to be viewed or edited.
    """
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    serializer_class_method_overrides = {
        'GET': NestedOwnerContentSerializer,
    }

    def pre_save(self, obj):
        obj.owner = self.request.user

