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

class ItemsLoadAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DepartmentSerializer
    
    def get_queryset(self):
        data = self.request.data
        serializer = DepartmentSerializer(data=data)
        if serializer.is_valid():
            dept = Department.objects.get(name = serializer.validated_data['name'])
        items = Item.objects.filter(dept=dept)
        return items

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = DepartmentSerializer(data=data)
        if serializer.is_valid():
            dept = Department.objects.get(name = serializer.validated_data['name'])
            url = dept.link
            items = scrape(url)
            for i in items:
                serializer2 = ItemSerializer(data=i)
                if serializer2.is_valid():
                    item = Item.objects.create(dept = dept, link = i['link'], name= i['name'], price= i['price'], img= i['img'])
                    print(item)
            return Response(items, status= status.HTTP_200_OK)

class DepartmentAPI(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DepartmentSerializer

    def get_queryset(self):
        queryset = Department.objects.all()
        return queryset


class ItemsAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DepartmentSerializer
    
    def get_queryset(self):
        data = self.request.data
        serializer = DepartmentSerializer(data=data)
        if serializer.is_valid():
            dept = Department.objects.get(name = serializer.validated_data['name'])
        items = Item.objects.filter(dept=dept)
        return items

    def post(self, request, *args, **kwargs):
        items = self.get_queryset()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)

