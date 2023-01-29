from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status, permissions
from .serializers import *
from django.http.response import JsonResponse

# Create your views here.
class TopStatsAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TopStatsSerializer
