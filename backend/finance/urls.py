from django.urls import path
from .views import *

urlpatterns = [
    path('graph/', GraphAPI.as_view(), name = 'graph'),
    
]