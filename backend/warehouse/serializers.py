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
        storage_item = StorageItem.objects.get(id = validated_data['id'])
        if validated_data['name']: 
            storage_item.name = validated_data['name']
        if validated_data['img']: 
            storage_item.img = validated_data['img']
        if validated_data['desc']: 
            storage_item.desc = validated_data['desc']
        if validated_data['added_date']: 
            storage_item.added_date = validated_data['added_date']
        if validated_data['expiry_date']: 
            storage_item.expiry_date = validated_data['expiry_date']
        storage_item.save()
        for costcount in costcount_data:
            obj = CostCount.objects.get(id = costcount['id'])
            if costcount['cost_price']:
                obj.cost_price = costcount['cost_price']
            if costcount['selling_price']:
                obj.selling_price = costcount['selling_price']
            if costcount['count']:
                obj.count = costcount['count']
            obj.save()

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
