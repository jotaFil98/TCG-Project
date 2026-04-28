from django.urls import path
from .views import obtener_cartas_aleatorias # <--- Verifica que este nombre coincida con tu views.py

urlpatterns = [
    path('cartas/random/', obtener_cartas_aleatorias),
]