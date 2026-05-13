from django.db import transaction
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Carta, Inventario # Importamos Inventario para guardar las cartas
import random

@api_view(['GET'])
@permission_classes([AllowAny])
def listar_cartas(request):
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
    todas_las_cartas = list(Carta.objects.all())
    cantidad = min(len(todas_las_cartas), 4)
    if cantidad == 0: return Response([], status=200)

    cartas_random = random.sample(todas_las_cartas, cantidad)
    data = [{"id": c.id, "nombre": c.nombre, "rareza": c.rareza, "imagen_url": str(c.imagen_url)} for c in cartas_random]
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def abrir_sobre(request):
    """Lógica para comprar un sobre, restar créditos y sumar XP."""
    user = request.user
    perfil = user.perfil # Accedemos al perfil vinculado

    # 1. Verificar créditos reales en el Perfil
    if perfil.creditos < 100:
        return Response({"error": "No tienes suficientes créditos"}, status=400)

    # 2. Verificar que existan cartas para entregar
    todas_las_cartas = list(Carta.objects.all())
    if len(todas_las_cartas) < 4:
        return Response({"error": "No hay suficientes cartas en el servidor"}, status=404)

    # 3. Transacción Atómica (O se hace todo o no se hace nada)
    with transaction.atomic():
        # Restar economía y sumar progreso
        perfil.creditos -= 100
        perfil.xp += 50  # ¡Sube la experiencia por cada sobre!
        
        # Lógica simple de niveles (cada 500 XP sube un nivel)
        if perfil.xp >= (perfil.nivel * 500):
            perfil.nivel += 1
        
        perfil.save()

        # Seleccionar cartas y guardarlas en el Inventario del jugador
        cartas_ganadas = random.sample(todas_las_cartas, 4)
        data = []
        for carta in cartas_ganadas:
            # Guardamos la carta en la base de datos para que el usuario la "posea"
            obj_inv, created = Inventario.objects.get_or_create(perfil=perfil, carta=carta)
            if not created:
                obj_inv.cantidad += 1
                obj_inv.save()
            
            data.append({
                "id": carta.id,
                "nombre": carta.nombre,
                "rareza": carta.rareza,
                "imagen_url": str(carta.imagen_url)
            })

    return Response({
        "mensaje": "¡Sobre abierto con éxito!",
        "stats_actualizadas": {
            "creditos": perfil.creditos,
            "xp": perfil.xp,
            "nivel": perfil.nivel
        },
        "cartas": data
    })