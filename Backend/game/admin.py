from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Carta, Perfil, Inventario, Mazo

admin.site.register(Carta)
admin.site.register(Perfil)
admin.site.register(Inventario)
admin.site.register(Mazo)