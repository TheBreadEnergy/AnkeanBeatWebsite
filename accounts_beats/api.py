from .models import PlayList, UserAccount
from rest_framework import viewsets, permissions
from .serializers import PlaylistSerializer, UserCreateSerializer



class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = PlayList.objects.all()
    permissions_classes = [
       permissions.AllowAny
    ]
    serializer_class = PlaylistSerializer

