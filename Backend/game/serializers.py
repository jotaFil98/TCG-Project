from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Carta, Perfil # Importamos Perfil

User = get_user_model()

# --- Serializer para las Cartas ---
class CartaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carta
        fields = '__all__'

# --- NUEVO: Serializer para el Perfil (Economía) ---
class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['usuario_id_game', 'creditos', 'diamantes', 'nivel', 'xp']

# --- NUEVO: Serializer para el Usuario completo ---
class UserSerializer(serializers.ModelSerializer):
    # Esto "anida" el perfil dentro del usuario
    perfil = PerfilSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'perfil']

# --- Serializer para Registro (El que ya usas) ---
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_with=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user