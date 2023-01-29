from django.urls import path
from .views import *

urlpatterns = [
    path('graph/', GetSetGoAPI.as_view(), name = 'graph'),
    
]