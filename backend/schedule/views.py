from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.generics import GenericAPIView, ListAPIView
from django.http.response import JsonResponse

# Create your views here.

#get all restock schedules
@api_view(['GET'])
def get_all_Rnotes(request):
    event_objs = Note.objects.filter(is_restock=True)
    serializer = NoteSerializer(event_objs,many=True)
    return Response({'status':200, 'all restock schedules': serializer.data})

#get all dispatch schedules
@api_view(['GET'])
def get_all_Dnotes(request):
    event_objs = Note.objects.filter(is_dispatch=True)
    serializer = NoteSerializer(event_objs,many=True)
    return Response({'status':200, 'all dispatch schedules': serializer.data})

#get all done notes
@api_view(['GET'])
def get_Done_note(request):
    event_objs = Note.objects.filter(is_done=True)
    serializer = NoteSerializer(event_objs,many=True)
    return Response({'status':200, 'all completed schedules': serializer.data})

#creates a restock event
@api_view(['POST'])
def create_Rnote(request):
    request.data['is_restock']=True
    data = request.data
    serializer = NoteSerializer(data = data)
    print(request.data)
    if not serializer.is_valid():
        return Response({'status':403,'message': "something went wrong"})
    serializer.save()
    return Response({'status':200, 'payload': serializer.data,'message': "Restock schedule entered"})

#creates a dispatch event
@api_view(['POST'])
def create_Dnote(request):
    request.data['is_dispatch']=True
    data = request.data
    serializer = NoteSerializer(data = data)
    print(request.data)
    if not serializer.is_valid():
        return Response({'status':403,'message': "something went wrong"})
    serializer.save()
    return Response({'status':200, 'payload': serializer.data,'message': "Dispatch schedule entered"})

#creates a done event
@api_view(['POST'])
def create_Done_note(request):
    request.data['is_done']=True
    data = request.data
    serializer = NoteSerializer(data = data)
    print(request.data)
    if not serializer.is_valid():
        return Response({'status':403,'message': "something went wrong"})
    serializer.save()
    return Response({'status':200, 'payload': serializer.data,'message': "Schedule completed"})

# class ItemGetAPI(GenericAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = NoteSerializer

#     def get(self, request):
#         storage_items = StorageItem.objects.filter(user = self.request.user)
#         data = self.serializer_class(storage_items, many=True).data
#         return JsonResponse({"response" : data}, status= status.HTTP_200_OK)