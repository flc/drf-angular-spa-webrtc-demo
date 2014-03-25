from django.contrib.auth.models import User, Group

from rest_framework import serializers

from .models import Content


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email')


class ContentSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Content
        fields = (
            'id', 'url', 'title', 'description',
            'created', 'updated', 'file'
            )


class NestedOwnerContentSerializer(ContentSerializer):
    owner = UserSerializer()

    class Meta:
        model = Content
        # we use this for GET requests where we include the owner field
        fields = ContentSerializer.Meta.fields + ('owner',)


