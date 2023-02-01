from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .model import *

# Create your views here.
class ImageDetectAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        data = self.request.data
        serializer = ImageSerializer(data=data)
        if serializer.is_valid():
            print('hi')
            pred = fruit_detection(serializer.validated_data['link'])
        return Response({'response' : pred}, status= status.HTTP_200_OK)