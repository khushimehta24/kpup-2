from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status, permissions
from .serializers import *
from django.http.response import JsonResponse

# Create your views here.
class ItemPostAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StorageItemPostSerializer

    def get_queryset(self):
        storage_items = StorageItem.objects.filter(user = self.request.user)
        return storage_items
        
    def post(self, request):
        data = request.data
        user = request.user
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            valid_data = serializer.create(serializer.validated_data, user)
            return JsonResponse({"success":"Successfully created"}, status= status.HTTP_201_CREATED)


class ItemGetAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StorageItemGetSerializer

    def get(self, request):
        storage_items = StorageItem.objects.filter(user = self.request.user)
        list2= []
        for item in storage_items:
            data = self.serializer_class(item).data
            list2.append(data)
        return JsonResponse({"reponse":list2}, status= status.HTTP_200_OK)
        
