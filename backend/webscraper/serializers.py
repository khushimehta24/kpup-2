from rest_framework import serializers
from .models import * 

class DepartmentSerializer(serializers.ModelSerializer):
    link = serializers.URLField(max_length = 200, read_only=True)
    
    class Meta:
        model = Department
        fields = ['name', 'link']

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['link', 'name', 'price', 'img']