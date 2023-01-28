from django.urls import path
from .views import *

urlpatterns = [
    path('item-post/', ItemPostAPI.as_view(), name = 'item-post-list'),
    path('item-get/', ItemGetAPI.as_view(), name = 'item-post-list'),
]