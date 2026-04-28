from django.shortcuts import render

from django.http import JsonResponse
from .models import Carta
import random

def obtener_cartas_aleatorias(request):
    # Traemos todas las cartas que registraste en el Admin
    todas_las_cartas = list(Carta.objects.all())
    
    # Si no hay cartas, mandamos un error amigable
    if not todas_las_cartas:
        return JsonResponse({"error": "No hay cartas en la base de datos"}, status=404)
    
    # Seleccionamos 3 cartas al azar (o las que quieras)
    cantidad = min(len(todas_las_cartas), 3)
    cartas_random = random.sample(todas_las_cartas, cantidad)
    
    # Formateamos los datos para que React los entienda
    data = []
    for carta in cartas_random:
        data.append({
            "id": carta.id,
            "nombre": carta.nombre,
            "rareza": carta.rareza,
            "imagen_url": carta.imagen_url, # Aquí irá lo de /cartas/nombre.png
            "atk": carta.atk,
            "hp": carta.hp,
        })
    
    return JsonResponse(data, safe=False)
