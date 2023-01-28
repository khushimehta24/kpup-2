from rest_framework import serializers

class ImageSerializer(serializers.Serializer):
    link = serializers.URLField()
    
    class Meta:
        fields = ['link']