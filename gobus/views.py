
from rest_framework.decorators import action
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Agencia, Terminal, Ruta, Bus, Conductor, Pasajero, Boleto, Viaje
from .serializers import (
    UserSerializer, AgenciaSerializer, TerminalSerializer, RutaSerializer,
    BusSerializer, ConductorSerializer, PasajeroSerializer, BoletoSerializer,ViajeSerializer
)


# ViewSet para el modelo de Usuario
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AgenciaViewSet(viewsets.ModelViewSet):
    queryset = Agencia.objects.all()
    serializer_class = AgenciaSerializer


class TerminalViewSet(viewsets.ModelViewSet):
    queryset = Terminal.objects.all()
    serializer_class = TerminalSerializer


class RutaViewSet(viewsets.ModelViewSet):
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer


class ViajeViewSet(viewsets.ModelViewSet):
    queryset = Viaje.objects.all()
    serializer_class = ViajeSerializer

    @action(detail=True, methods=['get'])
    def asientos_disponibles(self, request, pk=None):
        try:
            viaje = self.get_object()
            asientos_disponibles = viaje.cantidad_asientos_disponibles()  # Método en tu modelo Viaje
            return Response({"asientos_disponibles": asientos_disponibles}, status=status.HTTP_200_OK)
        except Viaje.DoesNotExist:
            return Response({"error": "Viaje no encontrado."}, status=status.HTTP_404_NOT_FOUND)

class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer


class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer


class PasajeroViewSet(viewsets.ModelViewSet):
    queryset = Pasajero.objects.all()
    serializer_class = PasajeroSerializer


class BoletoViewSet(viewsets.ModelViewSet):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer

    def create(self, request, *args, **kwargs):
        viaje_id = request.data.get('viaje')
        viaje = Viaje.objects.get(id=viaje_id)
        
        # Verificar si hay asientos disponibles
        if not viaje.asientos_disponibles():
            return Response(
                {"error": "No hay asientos disponibles para este viaje."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Si hay asientos disponibles, proceder a crear el boleto
        return super().create(request, *args, **kwargs)
