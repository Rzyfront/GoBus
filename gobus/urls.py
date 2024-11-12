from turtle import title
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls

from .views import (
    UserViewSet, AgenciaViewSet, TerminalViewSet, RutaViewSet,
    BusViewSet, ConductorViewSet, PasajeroViewSet, BoletoViewSet, ViajeViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'agencias', AgenciaViewSet)
router.register(r'terminales', TerminalViewSet)
router.register(r'rutas', RutaViewSet)
router.register(r'viajes', ViajeViewSet)
router.register(r'buses', BusViewSet)
router.register(r'conductores', ConductorViewSet)
router.register(r'pasajeros', PasajeroViewSet)
router.register(r'boletos', BoletoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title="Gobus Api Documentation"))
]
