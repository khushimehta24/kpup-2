from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.generics import GenericAPIView, ListAPIView
from django.http.response import JsonResponse

# Create your views here.

#get all notes
@api_view(['GET'])
def get_notes(request):
    file = open("notes.txt", "r")
    event_objs = file.read()
    serializer = NoteSerializer(event_objs,many=True)
    return Response({'status':200, 'all schedules': serializer.data})

#creates note
@api_view(['POST'])
def create_note(request):
    data = request.data
    serializer = NoteSerializer(data = data)
    if not serializer.is_valid():
        return Response({'status':403,'message': "something went wrong"})
    file = open('notes.txt','w')
    file.write(request.data)
    file.close()
    serializer.save()
    return Response({'status':200, 'payload': serializer.data,'message': "Schedule entered"})
