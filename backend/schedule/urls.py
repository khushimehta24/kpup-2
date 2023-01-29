from django.urls import path
from .views import *

urlpatterns = [
    path('note/', NoteAPI.as_view()),
]