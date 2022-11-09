from djoser.serializers import UserCreateSerializer
from .models import PlayList
from django.contrib.auth import authenticate, get_user_model
from rest_framework import exceptions, serializers
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings


User = get_user_model()


class PlaylistSerializer(serializers.ModelSerializer):
    plays_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = PlayList
        fields = ('id',
                  'title',
                  'time',
                  'cover',
                  'beat',
                  'bpm',
                  'mp3Price',
                  'wavPrice',
                  'trackout',
                  'unlimited',
                  'tag',
                  'mood',
                  'genre',
                  'link',
                  'plays_count')


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'cart', 'purchased','texts')


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.LOGIN_FIELD,
            'first_name', 'last_name', 'cart', 'purchased', 'texts'
        )
        read_only_fields = (settings.LOGIN_FIELD,)

    def update(self, instance, validated_data):
        email_field = get_user_email_field_name(User)
        instance.email_changed = False
        if settings.SEND_ACTIVATION_EMAIL and email_field in validated_data:
            instance_email = get_user_email(instance)
            if instance_email != validated_data[email_field]:
                instance.is_active = False
                instance.email_changed = True
                instance.save(update_fields=["is_active"])
        return super().update(instance, validated_data)

