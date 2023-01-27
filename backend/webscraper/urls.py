from django.urls import path
from .views import *

urlpatterns = [
    path('departments/', DepartmentAPI.as_view(), name = 'department'),
    path('scrap/', ItemsAPI.as_view(), name = 'department'),
]