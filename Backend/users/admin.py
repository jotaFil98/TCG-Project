from django.contrib import admin
from .models import Perfil

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    # Esto te permite ver estos campos en la tabla de admin
    list_display = ('user', 'creditos', 'nivel')
    # Esto te permite buscar usuarios por nombre
    search_fields = ('user__username',)