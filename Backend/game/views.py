from django.db import transaction
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Carta
import random

@api_view(['POST']) # Usamos POST porque estamos modificando datos
@permission_classes([IsAuthenticated]) # Solo usuarios logueados pueden abrir sobres
def abrir_sobre(request):
    user = request.user
    
    # 1. Verificar créditos
    if user.credits < 100:
        return Response({"error": "No tienes suficientes créditos"}, status=400)

    # 2. Verificar que haya cartas disponibles
    todas_las_cartas = list(Carta.objects.all())
    if len(todas_las_cartas) < 4:
        return Response({"error": "No hay suficientes cartas en la base de datos"}, status=404)

    # 3. Lógica segura con transacción (si algo falla, se cancela todo)
    with transaction.atomic():
        # Descontar créditos
        user.credits -= 100
        user.save()

        # Seleccionar 4 cartas al azar
        cartas_ganadas = random.sample(todas_las_cartas, 4)

        # Preparar respuesta
        data = []
        for carta in cartas_ganadas:
            data.append({
                "id": carta.id,
                "nombre": carta.nombre,
                "rareza": carta.rareza,
                "imagen_url": str(carta.imagen_url), # Aseguramos que sea string
                "atk": carta.atk,
                "hp": carta.hp,
            })
            # Opcional: Aquí podrías añadir las cartas al inventario del usuario
            # user.collection.add(carta) 

    return Response({
        "mensaje": "¡Sobre abierto con éxito!",
        "nuevo_saldo": user.credits,
        "cartas": data
    })