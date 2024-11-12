from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Agencia, Terminal, Ruta, Bus, Conductor, Pasajero, Boleto, Viaje


# Serializador para el modelo de Usuario de Django
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class AgenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agencia
        fields = ['id', 'nombre', 'direccion', 'telefono', 'correo', 'sitio_web', 'horario_atencion']


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = ['id', 'nombre', 'ubicacion', 'telefono']


class RutaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ruta
        fields = ['id', 'origen', 'destino', 'distancia', 'duracion_estimada', 'fecha_viaje', 'hora_salida',]

class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = ['id', 'ruta', 'bus', 'precio']


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'placa', 'capacidad', 'tipo', 'estado']


class ConductorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conductor
        fields = ['id', 'nombre', 'licencia', 'telefono', 'anios_experiencia']


class PasajeroSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()  # Incluir el usuario como un nested serializer

    class Meta:
        model = Pasajero
        fields = ['id', 'documento_identidad', 'usuario']


class BoletoSerializer(serializers.ModelSerializer):
    pasajero = PasajeroSerializer()  # Incluir el pasajero como un nested serializer
    viaje = ViajeSerializer() 
    class Meta:
        model = Boleto
        fields = ['id','viaje','asiento', 'precio', 'estado', 'pasajero']
