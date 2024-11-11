from django.contrib import admin
from .models import Agencia
from .models import Terminal
from .models import Ruta
from .models import Bus
from .models import Conductor
from .models import Pasajero
from .models import Boleto
# Register your models here.

admin.site.register(Agencia)
admin.site.register(Terminal)
admin.site.register(Ruta)
admin.site.register(Bus)
admin.site.register(Conductor)
admin.site.register(Pasajero)
admin.site.register(Boleto)