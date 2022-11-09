import os.path
from django.http import FileResponse, Http404, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import PlayList
from .serializers import PlaylistSerializer
from rest_framework.views import APIView
from . import models

class ankeansiteAPIList(generics.ListCreateAPIView):
    queryset = PlayList.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

class StramingAudioView(APIView):
    def set_play(self, PlayList):
        PlayList.plays_count += 1
        PlayList.save()

    def get(self, request, pk):
        PlayList = get_object_or_404(models.PlayList, id=pk)
        if os.path.exists(PlayList.beat.path):
            self.set_play(PlayList)
            return FileResponse(open(PlayList.beat.path, 'rb'), filename=PlayList.beat.name)
        else:
            return Http404