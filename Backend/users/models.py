from django.contrib.auth.models import User
from django.db import models

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    creditos = models.IntegerField(default=500)
    nivel = models.IntegerField(default=1)

    def __str__(self):
        return self.user.username