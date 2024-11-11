from django.db import models

# Create your models here.
from django.db import models

class Agencia(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15)
    correo = models.EmailField()
    sitio_web = models.URLField(blank=True, null=True)
    horario_atencion = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Terminal(models.Model):
    nombre = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre


class Ruta(models.Model):
    origen = models.CharField(max_length=100)
    destino = models.CharField(max_length=100)
    distancia = models.DecimalField(max_digits=5, decimal_places=2)
    duracion_estimada = models.DecimalField(max_digits=4, decimal_places=2)  # en horas

    def __str__(self):
        return f"{self.origen} - {self.destino}"


class Bus(models.Model):
    placa = models.CharField(max_length=10, unique=True)
    capacidad = models.IntegerField()
    tipo = models.CharField(max_length=50, choices=[
        ('EJ', 'Ejecutivo'),
        ('ES', 'Estándar'),
        ('VIP', 'VIP'),
    ])
    estado = models.CharField(max_length=20, choices=[
        ('disponible', 'Disponible'),
        ('mantenimiento', 'En Mantenimiento'),
        ('no_disponible', 'No Disponible'),
    ])

    def __str__(self):
        return self.placa


class Conductor(models.Model):
    nombre = models.CharField(max_length=100)
    licencia = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=15)
    anios_experiencia = models.IntegerField()

    def __str__(self):
        return self.nombre


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=128)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    tipo_usuario = models.CharField(max_length=50, choices=[
        ('cliente', 'Cliente'),
        ('administrador', 'Administrador'),
    ])

    def __str__(self):
        return self.nombre


class Pasajero(models.Model):
    documento_identidad = models.CharField(max_length=20, unique=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario.nombre} - {self.documento_identidad}"


class Boleto(models.Model):
    fecha_viaje = models.DateField()
    hora_salida = models.TimeField()
    asiento = models.IntegerField()
    precio = models.DecimalField(max_digits=7, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[
        ('reservado', 'Reservado'),
        ('cancelado', 'Cancelado'),
        ('confirmado', 'Confirmado'),
    ])
    pasajero = models.ForeignKey(Pasajero, on_delete=models.CASCADE)

    def __str__(self):
        return f"Boleto {self.id} para {self.pasajero}"
