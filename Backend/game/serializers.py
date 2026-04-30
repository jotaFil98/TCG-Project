from rest_framework import serializers
from .models import Carta # Asegúrate de importar tu modelo Carta

class CartaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carta
        fields = '__all__' # O especifica los campos: ['nombre', 'rareza', 'img']