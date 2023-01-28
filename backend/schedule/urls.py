from django.urls import path
from .views import *

urlpatterns = [
    path('get_restockings/',get_all_Rnotes),
    path('get_dispatches/', get_all_Dnotes),
    path('get_dones/', get_Done_note),
    path('add_restock/', create_Rnote),
    path('add_dispatch/', create_Dnote),
    path('add_done/', create_Done_note),
]