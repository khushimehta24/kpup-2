from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import User


# Register your models here.
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ['email', 'name','is_staff','is_active','is_superuser', 'phone_no']
    list_filter = ['email','name','is_staff','is_active','is_superuser', 'phone_no']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',),}),
        ('Permissions', {'fields': ('is_active','is_staff','is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide,'),
            'fields': ('email', 'password1', 'password2', 'name','is_staff','is_active', 'phone_no'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)

# Register your models here.
