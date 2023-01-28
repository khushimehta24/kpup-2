from django.contrib import admin
from .models import *


# Register your models here.
class DepartmentAdmin(admin.ModelAdmin):
    model = Department
    list_display = ['name', 'link']
    list_filter = ['name', 'link']
    fields = ['name', 'link']

    search_fields = ('name',)
    ordering = ('name',)
    filter_horizontal = ()


class ItemAdmin(admin.ModelAdmin):
    model = Item
    list_display = ['dept', 'link', 'name', 'price', 'img']
    list_filter = ['dept', 'link', 'name', 'price', 'img']
    fields = ['dept', 'link', 'name', 'price', 'img']

    search_fields = ('name',)
    ordering = ('name',)
    filter_horizontal = ()


admin.site.register(Department, DepartmentAdmin)
admin.site.register(Item, ItemAdmin)