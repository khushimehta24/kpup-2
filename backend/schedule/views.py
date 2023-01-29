from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.generics import GenericAPIView, ListAPIView
from django.http.response import JsonResponse
import json
# Create your views here.

#get all notes
@api_view(['GET'])
def get_notes(request):
    file = open("notes.json", "r")
    event_objs = json.loads(file.read())
    return Response({'status':200, 'all schedules': event_objs})

#creates note
@api_view(['POST'])
def create_note(request):
    data = request.data
    stringvalue = str(request.data)
    with open('notes.json', 'w') as fp:
        json.dump(request.data, fp)
    return Response({'status':200, 'payload': request.data ,'message': "Schedule entered"})
