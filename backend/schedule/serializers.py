from rest_framework import serializers
from .models import * 

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'desc', 'is_restock', 'is_dispatch', 'is_done']

