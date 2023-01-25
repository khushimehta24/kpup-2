from rest_framework.generics import GenericAPIView
from rest_framework.authtoken.models import Token
from .serializers import *
from django.contrib.auth import authenticate,login
from rest_framework.response import Response
from rest_framework import status,permissions

# Create your views here.

class UserRegisterAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer
    
    def post(self,request,*args,**kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response(token.key, status=status.HTTP_201_CREATED)


class LoginAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
	
    def post(self,request,*args,**kwargs ):
        email = request.data.get('email',None)
        password = request.data.get('password',None)
        user = authenticate(email = email, password = password)
        if user :
            login(request,user)
            serializer = self.serializer_class(user)
            token = Token.objects.get(user=user)
            return Response(token.key,status = status.HTTP_200_OK)
        else:   
            return Response('Invalid Credentials',status = status.HTTP_404_NOT_FOUND)