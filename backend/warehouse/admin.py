from django.contrib import admin
from .models import *

# Register your models here.
class CostCountAdmin(admin.ModelAdmin):
    model = CostCount
    list_display = ['id','item', 'cost_price', 'selling', 'count', 'sold_count']
    list_filter = ['id','item', 'cost_price', 'selling', 'count', 'sold_count']
    fields = ['item', 'cost_price', 'selling', 'count', 'sold_count']

    search_fields = ('item',)
    ordering = ('item',)
    filter_horizontal = ()

class StorageItemAdmin(admin.ModelAdmin):
    model = StorageItem
    list_display = ['id','name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'user', 'threshold', 'restock']
    list_filter = ['id','name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'user', 'threshold', 'restock']
    fields = ['name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'user', 'threshold', 'restock']

    search_fields = ('name', 'user')
    ordering = ('name',)
    filter_horizontal = ()


admin.site.register(StorageItem, StorageItemAdmin)
admin.site.register(CostCount, CostCountAdmin)