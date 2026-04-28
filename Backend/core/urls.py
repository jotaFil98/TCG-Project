from django.contrib import admin
from django.urls import path, include # Agregamos 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    # Aquí le decimos a Django que si la URL empieza con 'api/', 
    # vaya a buscar las rutas dentro de tu aplicación 'game'
    path('api/', include('game.urls')), 
]