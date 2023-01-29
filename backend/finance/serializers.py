from rest_framework import serializers
from .models import * 

class GraphSerializer(serializers.Serializer):
    response = serializers.JSONField()

    class Meta:
        fields = ['response']