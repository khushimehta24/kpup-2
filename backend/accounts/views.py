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

class UserGetAPI(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user = User.objects.get(email = request.user.email)
            serializer = self.serializer_class(user)
        except:
            return Response("User not found", status= status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self,request,*args,**kwargs):
        user = User.objects.get(email=request.user.email)
        data = request.data
        if user.email != data['email']:
            user.delete()
            user = User.objects.create_user(data['email'], data['password'])
            token = Token.objects.create(user=user)
        serializer = self.serializer_class(data=data)
        user = serializer.update(request.data, user)
        return Response(request.data, status = status.HTTP_200_OK)

