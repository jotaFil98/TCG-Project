from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario creado"})
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            return Response({"message": "Login exitoso", "user": user.username})
        return Response({"error": "Credenciales inválidas"}, status=401)