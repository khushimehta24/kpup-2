from django.contrib import admin
from .models import Department


# Register your models here.
class DepartmentAdmin(admin.ModelAdmin):
    model = Department
    list_display = ['name', 'link']
    list_filter = ['name', 'link']
    fields = ['name', 'link']

    search_fields = ('name',)
    ordering = ('name',)
    filter_horizontal = ()


admin.site.register(Department, DepartmentAdmin)