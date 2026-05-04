from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Ruta de administrador (solo una vez)
    path('admin/', admin.site.urls),
    
    # Rutas de juego bajo el prefijo 'game'
    path('api/game/', include('game.urls')),
    
    # Rutas de usuarios bajo el prefijo 'users'
    path('api/users/', include('users.urls')),
]