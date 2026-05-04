from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView

urlpatterns = [
    # Registro
    path('register/', RegisterView.as_view(), name='register'),
    
    # Login: Al hacer POST aquí con username y password, te devuelve los tokens
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh: Para refrescar el token sin loguearse de nuevo
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]