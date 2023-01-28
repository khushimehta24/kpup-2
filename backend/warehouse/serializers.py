from rest_framework import serializers
from .models import * 

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ['name']

class CostCountSerializer(serializers.ModelSerializer):

    class Meta:
        model = CostCount
        fields = ['id','cost_price', 'selling_price', 'count']

class StorageItemPostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    costcount = CostCountSerializer(many=True)

    class Meta:
        model = StorageItem
        fields = ['id','name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'costcount']

    def create(self, validated_data, user):
        costcount_data = validated_data.pop('costcount')
        category = validated_data.pop('category')
        dept, created = Department.objects.get_or_create(name=category['name'])
        storage_item, created = StorageItem.objects.get_or_create(user =user, category = dept, **validated_data)
        for costcount in costcount_data:
            CostCount.objects.create(item = storage_item, **costcount)
        return validated_data

    def update(self, validated_data):
        costcount_data = validated_data.pop('costcount')
        category = validated_data.pop('category')
        dept = Department.objects.get_or_create(name=category['name'])
        storage_item, created = StorageItem.objects.get(id = validated_data['id'])
        storage_item.name = validated_data['name']
        storage_item.img = validated_data['img']
        storage_item.desc = validated_data['desc']
        storage_item.added_date = validated_data['added_date']
        storage_item.expiry_date = validated_data['expiry_date']
        storage_item.category = dept
        for costcount in costcount_data:
            CostCount.objects.get(id = costcount['id']).update(costcount)
        return "Success"



class StorageItemGetSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    costcount = serializers.SerializerMethodField()

    class Meta:
        model = StorageItem
        fields = ['id','name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'costcount']   

    def get_costcount(self, obj):
        costcount_objs = CostCount.objects.filter(item = obj)
        cc_data = CostCountSerializer(costcount_objs, many=True).data
        return cc_data
