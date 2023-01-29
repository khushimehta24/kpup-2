from rest_framework import serializers
from .models import * 

class GetSetGoSerializer(serializers.Serializer):
    response = serializers.JSONField()

    class Meta:
        fields = ['response']