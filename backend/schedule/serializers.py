from rest_framework import serializers
from .models import * 

class NoteSerializer(serializers.Serializer):
    lamba_string = serializers.StringRelatedField()
    class Meta:
        fields = ['lamba_string']

