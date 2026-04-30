from django.urls import path
from .views import obtener_cartas_aleatorias, listar_cartas

urlpatterns = [
    # Esta es tu ruta para cartas aleatorias
    path('cartas/random/', obtener_cartas_aleatorias, name='cartas_random'),
    
    # Esta es tu ruta para listar todas las cartas
    path('api/cartas/', listar_cartas, name='listar_cartas'),
]