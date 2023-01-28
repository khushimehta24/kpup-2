from django.contrib import admin
from .models import *

# Register your models here.
class CostCountAdmin(admin.ModelAdmin):
    model = CostCount
    list_display = ['item', 'cost_price', 'selling_price', 'count']
    list_filter = ['item', 'cost_price', 'selling_price', 'count']
    fields = ['item', 'cost_price', 'selling_price', 'count']

    search_fields = ('item',)
    ordering = ('item',)
    filter_horizontal = ()

class StorageItemAdmin(admin.ModelAdmin):
    model = StorageItem
    list_display = ['name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'user']
    list_filter = ['name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'user']
    fields = ['name', 'img', 'desc', 'added_date', 'expiry_date', 'category', 'user']

    search_fields = ('name', 'user')
    ordering = ('name',)
    filter_horizontal = ()


admin.site.register(StorageItem, StorageItemAdmin)
admin.site.register(CostCount, CostCountAdmin)