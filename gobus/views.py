
from rest_framework.decorators import action
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Agencia, Terminal, Ruta, Bus, Conductor, Pasajero, Boleto, Viaje
from .serializers import (
    UserSerializer, AgenciaSerializer, TerminalSerializer, RutaSerializer,
    BusSerializer, ConductorSerializer, PasajeroSerializer, BoletoSerializer,ViajeSerializer
)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            # Obtener el usuario desde el request usando la autenticación JWT
            user = request.user

            # Retornar los detalles del usuario
            user_data = {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'last_login': user.last_login,
                'is_superuser':user.is_superuser,
                'is_staff':user.is_staff,
                'is_active': user.is_active,
                # Puedes agregar más campos si es necesario
            }

            return Response(user_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# ViewSet para el modelo de Usuario
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':  # Permitir registro sin token
            return []
        return [IsAuthenticated()]

class AgenciaViewSet(viewsets.ModelViewSet):
    queryset = Agencia.objects.all()
    serializer_class = AgenciaSerializer
    permission_classes = [IsAuthenticated]


class TerminalViewSet(viewsets.ModelViewSet):
    queryset = Terminal.objects.all()
    serializer_class = TerminalSerializer
    permission_classes = [IsAuthenticated]


class RutaViewSet(viewsets.ModelViewSet):
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer
    permission_classes = [IsAuthenticated]


class ViajeViewSet(viewsets.ModelViewSet):
    queryset = Viaje.objects.all()
    serializer_class = ViajeSerializer
    permission_classes = [IsAuthenticated]


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
    permission_classes = [IsAuthenticated]


class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer
    permission_classes = [IsAuthenticated]


class PasajeroViewSet(viewsets.ModelViewSet):
    queryset = Pasajero.objects.all()
    serializer_class = PasajeroSerializer
    permission_classes = [IsAuthenticated]


class BoletoViewSet(viewsets.ModelViewSet):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer
    permission_classes = [IsAuthenticated]

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
