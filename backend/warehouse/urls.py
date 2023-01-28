from django.urls import path
from .views import *

urlpatterns = [
    path('item-post/', ItemPostAPI.as_view(), name = 'item-post'),
    path('item-list/', ItemGetAPI.as_view(), name = 'item-list'),
    path('item-put/<int:pk>', ItemPutAPI.as_view(), name = 'item-put'),
    
]