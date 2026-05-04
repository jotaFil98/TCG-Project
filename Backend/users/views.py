from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer

class RegisterView(APIView):
    # Esta vista no requiere estar autenticado para registrarse (obvio)
    permission_classes = [] 

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Usuario creado exitosamente",
                "username": user.username
            }, status=status.HTTP_201_CREATED)
        
        # Si los datos no son válidos (ej: falta email, pass débil), devolvemos el error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)