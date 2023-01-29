from django.urls import path
from .views import *

urlpatterns = [
    path('get_note/',get_notes),
    path('create_note/', create_note),
]