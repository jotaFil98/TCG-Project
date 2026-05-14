from django.contrib import admin
from .models import Carta, Perfil, Inventario, Mazo, Coleccion

# Configuración elegante para las Cartas
class CartaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'coleccion', 'rareza', 'tipo', 'hp', 'atk') # Columnas que verás en la lista
    list_filter = ('coleccion', 'rareza', 'tipo') # Filtros laterales para búsqueda rápida
    search_fields = ('nombre',) # Buscador por nombre
    list_per_page = 20 # Cuántas cartas ver por página

# Configuración para las Colecciones
class ColeccionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'activa')
    search_fields = ('nombre',)

# Configuración para el Perfil (Economía)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'nivel', 'creditos', 'xp', 'usuario_id_game')
    search_fields = ('usuario__username', 'usuario_id_game')

# Registro de los modelos
admin.site.register(Carta, CartaAdmin)
admin.site.register(Coleccion, ColeccionAdmin)
admin.site.register(Perfil, PerfilAdmin)
admin.site.register(Inventario)
admin.site.register(Mazo)