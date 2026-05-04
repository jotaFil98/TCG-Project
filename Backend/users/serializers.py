from rest_framework import serializers
from django.contrib.auth import get_user_model

# Obtiene tu CustomUser actual
User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}} # La contraseña nunca se devuelve en la respuesta

    def create(self, validated_data):
        # Creamos al usuario con create_user para que la contraseña se guarde encriptada
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user