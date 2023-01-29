from django.urls import path
from .views import *

urlpatterns = [
    path('item-post/', TopStatsAPI.as_view(), name = 'item-post'),
    
]