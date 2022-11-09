from django.contrib import admin
from .models import PlayList


class AnkeanAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'bpm', 'link')
    list_display_links = ('id', 'title')
    search_fields = ('id', 'title')
    list_filter = ('id', 'title', 'bpm')


admin.site.register(PlayList, AnkeanAdmin)
