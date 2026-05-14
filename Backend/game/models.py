from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# --- 1. MODELO DE PERFIL (Economía y Progreso) ---
class Perfil(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='perfil')
    usuario_id_game = models.CharField(max_length=20, unique=True)
    creditos = models.IntegerField(default=500)
    diamantes = models.IntegerField(default=10) 
    nivel = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)

    def __str__(self):
        return f"Perfil de {self.usuario.username} - Nivel: {self.nivel}"

# --- NUEVO: MODELO DE COLECCIÓN ---
class Coleccion(models.Model):
    nombre = models.CharField(max_length=100)
    imagen_banner = models.CharField(max_length=500, help_text="Ruta o URL del banner para el Home")
    descripcion = models.TextField(blank=True, null=True)
    activa = models.BooleanField(default=True, help_text="Para ocultar colecciones en desarrollo")

    class Meta:
        verbose_name_plural = "Colecciones"

    def __str__(self):
        return self.nombre

# --- 2. MODELO DE CARTA MAESTRA ---
class Carta(models.Model):
    RAREZA_CHOICES = [
        ('COMUN', 'Común'),
        ('RARA', 'Rara'),
        ('EPICA', 'Épica'),
        ('MITICA', 'Mítica'),
        ('LEGENDARIA', 'Legendaria'),
    ]

    TIPO_CHOICES = [
        ('PERSONAJE', 'Personaje'),
        ('OBJETO', 'Objeto (Equipo)'),
        ('ENTORNO', 'Entorno'),
        ('CONSUMIBLE', 'Consumible'),
    ]

    # --- RELACIÓN CON COLECCIÓN (Nueva) ---
    coleccion = models.ForeignKey(Coleccion, on_delete=models.CASCADE, related_name='cartas', null=True, blank=True)
    
    nombre = models.CharField(max_length=100)
    rareza = models.CharField(max_length=20, choices=RAREZA_CHOICES, default='COMUN')
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='PERSONAJE')
    categoria = models.CharField(max_length=50, help_text="Ej: Ficción, Real, Mito")
    
    # Stats (Solo para Personajes)
    hp = models.IntegerField(default=0, help_text="Vida de la carta")
    atk = models.IntegerField(default=0, help_text="Ataque de la carta")
    costo_invocacion = models.IntegerField(default=1, help_text="Energía necesaria en mesa")
    costo_accion = models.IntegerField(default=1, help_text="Energía que gasta al atacar")

    # Lógica de Soporte
    descripcion_efecto = models.TextField(blank=True, null=True)
    costo_uso = models.IntegerField(default=1, help_text="Energía para activar soporte")

    # Visual
    imagen_url = models.CharField(max_length=500, help_text="Ruta: /cartas/nombre.png")

    def __str__(self):
        return f"{self.nombre} ({self.rareza}) - {self.coleccion.nombre if self.coleccion else 'Sin Colección'}"

# --- 3. MODELO DE INVENTARIO ---
class Inventario(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name='mis_cartas')
    carta = models.ForeignKey(Carta, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    fecha_obtencion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.perfil.usuario.username} tiene {self.carta.nombre}"

# --- 4. MODELO DE MAZO ---
class Mazo(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    nombre_mazo = models.CharField(max_length=50, default="Mi Mazo Principal")
    cartas = models.ManyToManyField(Carta, help_text="Selecciona las cartas para este mazo")

    def __str__(self):
        return f"Mazo: {self.nombre_mazo} de {self.perfil.usuario.username}"

# --- SEÑALES PARA CREAR PERFIL AUTOMÁTICAMENTE ---
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        id_random = f"{instance.username}#{instance.id}"
        # Buscamos si ya existe para evitar errores en recreaciones
        Perfil.objects.get_or_create(usuario=instance, usuario_id_game=id_random)