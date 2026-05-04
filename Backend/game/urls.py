from django.urls import path
# Asegúrate de importar 'abrir_sobre' aquí mismo
from .views import obtener_cartas_aleatorias, listar_cartas, abrir_sobre

urlpatterns = [
    # Estas rutas serán: 
    # /api/cartas/random/
    # /api/cartas/
    # /api/abrir-sobre/
    path('cartas/random/', obtener_cartas_aleatorias, name='cartas_random'),
    path('cartas/', listar_cartas, name='listar_cartas'),
    path('abrir-sobre/', abrir_sobre, name='abrir_sobre'),
]