from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from .scraper import scrape

# Create your views here.

class ItemsAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DepartmentSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            url = Department.objects.get(name = serializer.validated_data['name']).link
            items = scrape(url)
            ItemsSerializer(items)
            return Response(items, status= status.HTTP_200_OK)

class DepartmentAPI(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DepartmentSerializer

    def get_queryset(self):
        queryset = Department.objects.all()
        return queryset


