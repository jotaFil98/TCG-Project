from django.urls import path
from .views import obtener_cartas_aleatorias, listar_cartas

urlpatterns = [
    # Quitamos el 'api/' de aquí porque ya está en el core
    path('cartas/random/', obtener_cartas_aleatorias, name='cartas_random'),
    path('cartas/', listar_cartas, name='listar_cartas'),
]