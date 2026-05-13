from django.db import transaction
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Carta
import random

@api_view(['GET'])
@permission_classes([AllowAny]) # Cualquiera puede ver las cartas, incluso sin loguearse
def listar_cartas(request):
    """Devuelve la lista completa de todas las cartas en la base de datos."""
    cartas = Carta.objects.all()
    data = []
    for carta in cartas:
        data.append({
            "id": carta.id,
            "nombre": carta.nombre,
            "rareza": carta.rareza,
            "imagen_url": str(carta.imagen_url),
            "atk": carta.atk,
            "hp": carta.hp,
        })
    return Response(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def obtener_cartas_aleatorias(request):
    """Devuelve 4 cartas al azar para mostrar en el Home o landing page."""
    todas_las_cartas = list(Carta.objects.all())
    cantidad = min(len(todas_las_cartas), 4) # Por si tienes menos de 4 cartas
    
    if cantidad == 0:
        return Response([], status=200)

    cartas_random = random.sample(todas_las_cartas, cantidad)
    data = []
    for carta in cartas_random:
        data.append({
            "id": carta.id,
            "nombre": carta.nombre,
            "rareza": carta.rareza,
            "imagen_url": str(carta.imagen_url),
            "atk": carta.atk,
            "hp": carta.hp,
        })
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def abrir_sobre(request):
    """Lógica para comprar un sobre de 4 cartas."""
    user = request.user
    
    # 1. Verificar créditos (ajusta 'credits' al nombre real en tu CustomUser)
    if user.credits < 100:
        return Response({"error": "No tienes suficientes créditos"}, status=400)

    # 2. Verificar disponibilidad
    todas_las_cartas = list(Carta.objects.all())
    if len(todas_las_cartas) < 4:
        return Response({"error": "No hay suficientes cartas en el servidor"}, status=404)

    # 3. Transacción segura
    with transaction.atomic():
        user.credits -= 100
        user.save()

        cartas_ganadas = random.sample(todas_las_cartas, 4)
        data = []
        for carta in cartas_ganadas:
            data.append({
                "id": carta.id,
                "nombre": carta.nombre,
                "rareza": carta.rareza,
                "imagen_url": str(carta.imagen_url),
                "atk": carta.atk,
                "hp": carta.hp,
            })
            # Si tienes una relación ManyToMany para la colección, actívala aquí:
            # user.coleccion.add(carta) 

    return Response({
        "mensaje": "¡Sobre abierto con éxito!",
        "nuevo_saldo": user.credits,
        "cartas": data
    })