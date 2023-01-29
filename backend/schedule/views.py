from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.generics import GenericAPIView, ListAPIView
from django.http.response import JsonResponse
import json
# Create your views here.

#get all notes
class NoteAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = NoteSerializer

    def get(self, request):
        file = open("notes.json", "r")
        event_objs = json.loads(file.read())
        with open("notes.json", "r") as read_content:
            obj = json.load(read_content)
        self.serializer_class(obj)
        return Response({'response': event_objs}, status=status.HTTP_200_OK)

    #creates note
    def post(self, request):
        data = request.data
        self.serializer_class(data)
        with open('notes.json', 'w') as fp:
            json.dump(request.data, fp)
        return Response({'payload': data ,'message': "Schedule entered"}, status=status.HTTP_200_OK)
