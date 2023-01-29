from django.urls import path
from .views import *

urlpatterns = [
    path('item-post/', GraphAPI.as_view(), name = 'item-post'),
    
]