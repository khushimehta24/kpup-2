from rest_framework import serializers
from .models import * 

class DepartmentSerializer(serializers.ModelSerializer):
    link = serializers.URLField(max_length = 200, read_only=True)
    
    class Meta:
        model = Department
        fields = ['name', 'link']

class ItemsSerializer(serializers.Serializer):
    link = serializers.URLField(max_length = 200)
    name = serializers.CharField(max_length = 200)
    img = serializers.CharField(max_length = 200)
    price = serializers.CharField(max_length = 50)

    class Meta:
        fields = ['link', 'name', 'price', 'img']