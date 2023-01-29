from django.urls import path
from .views import *

urlpatterns = [
    path('getsetgo/', GetSetGoAPI.as_view(), name = 'getsetgo'),
    
]