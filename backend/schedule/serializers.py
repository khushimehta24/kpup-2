from rest_framework import serializers
from .models import * 

class NoteSerializer(serializers.Serializer):
    lamba_string = serializers.CharField()
    class Meta:
        fields = ['lamba_string']

    # def create(self, validated_data):
    #     raise NotImplementedError('`create()` must be implemented.')
