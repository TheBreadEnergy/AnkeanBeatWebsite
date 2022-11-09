from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts_beats.views import ankeansiteAPIList
from accounts_beats.views import StramingAudioView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin', admin.site.urls),
    path('api/playlist/', ankeansiteAPIList.as_view()),
    path('api/steam-track/<int:pk>/', StramingAudioView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]