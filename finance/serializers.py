from rest_framework import serializers
from .models import * 

class TopStatsSerializer(serializers.Serializer):
    
    class Meta:
        fields = []