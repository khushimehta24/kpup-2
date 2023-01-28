from rest_framework import serializers
from .models import * 

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ['name']

class CostCountSerializer(serializers.ModelSerializer):

    class Meta:
        model = CostCount
        fields = ['cost_price', 'selling_price', 'count']

class StorageItemPostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    costcount = CostCountSerializer(many=True)

    class Meta:
        model = StorageItem
        fields = ['name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'costcount']

    def create(self, validated_data, user):
        costcount_data = validated_data.pop('costcount')
        category = validated_data.pop('category')
        dept = Department.objects.get_or_create(name=category['name'])
        storage_item = StorageItem.objects.create(user =user, category = dept[0], **validated_data)
        for costcount in costcount_data:
            CostCount.objects.create(item = storage_item, **costcount)
        return validated_data


class StorageItemGetSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    costcount = serializers.SerializerMethodField()

    class Meta:
        model = StorageItem
        fields = ['name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'costcount']   

    def get_costcount(self, obj):
        costcount_objs = CostCount.objects.filter(item = obj)
        list1 = []
        for cc_obj in costcount_objs:
            cc_data = CostCountSerializer(cc_obj).data
            list1.append(cc_data)
        return list1