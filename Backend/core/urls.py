from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Aquí le decimos a Django: "Todo lo que empiece por api/users/, 
    # búscalo en el archivo urls.py de la carpeta users"
    path('api/users/', include('users.urls')),
]