from django.db import models
from django.conf import settings  # Importante para referenciar tu CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver

# --- 1. MODELO DE PERFIL (Economía y Progreso) ---
class Perfil(models.Model):
    # Usamos settings.AUTH_USER_MODEL en lugar de User
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='perfil')
    usuario_id_game = models.CharField(max_length=20, unique=True)
    monedas = models.IntegerField(default=500)  # Monedas iniciales
    diamantes = models.IntegerField(default=10) # Diamantes iniciales
    nivel = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)

    def __str__(self):
        # Como es un CustomUser, 'username' sigue existiendo
        return f"Perfil de {self.usuario.username} - ID: {self.usuario_id_game}"

# --- 2. MODELO DE CARTA MAESTRA ---
class Carta(models.Model):
    # Opciones de Rareza
    RAREZA_CHOICES = [
        ('COMUN', 'Común'),
        ('RARA', 'Rara'),
        ('EPICA', 'Épica'),
        ('MITICA', 'Mítica'),
        ('LEGENDARIA', 'Legendaria'),
    ]

    # Opciones de Tipo
    TIPO_CHOICES = [
        ('PERSONAJE', 'Personaje'),
        ('OBJETO', 'Objeto (Equipo)'),
        ('ENTORNO', 'Entorno'),
        ('CONSUMIBLE', 'Consumible'),
    ]

    nombre = models.CharField(max_length=100)
    rareza = models.CharField(max_length=20, choices=RAREZA_CHOICES, default='COMUN')
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='PERSONAJE')
    categoria = models.CharField(max_length=50, help_text="Ej: Ficción, Real, Mito")
    
    # Stats (Solo para Personajes)
    hp = models.IntegerField(default=0, help_text="Vida de la carta")
    atk = models.IntegerField(default=0, help_text="Ataque de la carta")
    costo_invocacion = models.IntegerField(default=1, help_text="Energía necesaria en mesa")
    costo_accion = models.IntegerField(default=1, help_text="Energía que gasta al atacar")

    # Lógica de Soporte (Objeto, Entorno, Consumible)
    descripcion_efecto = models.TextField(blank=True, null=True)
    costo_uso = models.IntegerField(default=1, help_text="Energía para activar soporte")

    # Visual
    imagen_url = models.CharField(max_length=500, help_text="Ruta: /cartas/nombre.png")

    def __str__(self):
        return f"{self.nombre} ({self.rareza})"

# --- 3. MODELO DE INVENTARIO (Relación Usuario-Carta) ---
class Inventario(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name='mis_cartas')
    carta = models.ForeignKey(Carta, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    fecha_obtencion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.perfil.usuario.username} tiene {self.carta.nombre}"

# --- 4. MODELO DE MAZO (Decks del Jugador) ---
class Mazo(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    nombre_mazo = models.CharField(max_length=50, default="Mi Mazo Principal")
    cartas = models.ManyToManyField(Carta, help_text="Selecciona las cartas para este mazo")

    def __str__(self):
        return f"Mazo: {self.nombre_mazo} de {self.perfil.usuario.username}"

# --- SEÑALES PARA CREAR PERFIL AUTOMÁTICAMENTE ---
# IMPORTANTE: El sender ahora es settings.AUTH_USER_MODEL
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        id_random = f"{instance.username}#{instance.id}"
        Perfil.objects.create(usuario=instance, usuario_id_game=id_random)