from django.urls import path
from .views import *

urlpatterns = [
    path('departments/', DepartmentAPI.as_view(), name = 'department'),
    path('scrap/', ItemsLoadAPI.as_view(), name = 'scrap'),
    path('items/', ItemsAPI.as_view(), name = 'scrap'),
]