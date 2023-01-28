from django.contrib import admin
from .models import *
# Register your models here.
class NoteAdmin(admin.ModelAdmin):
    model = Note
    list_display = ['id', 'title', 'desc', 'is_restock', 'is_dispatch', 'is_done']
    list_filter =['id', 'title', 'desc', 'is_restock', 'is_dispatch', 'is_done']
    fields = ['id', 'title', 'desc', 'is_restock', 'is_dispatch', 'is_done']

admin.site.register(Note, NoteAdmin)

