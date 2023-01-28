from django.urls import path
from .views import *

urlpatterns = [
    path('', ImageDetectAPI.as_view(), name = 'image_detect'),
]