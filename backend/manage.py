#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
     # DEVS
    print("\nPROYECTO DESARROLLADO POR:\n")
    print("\nRafael Martinez\n")
    print("Cristian Milian\n")
    print("Cesar carrillo\n")


    # AGREGAR NOMBRES ARRIBA DE ESTE COMENTARIO
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gobus_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
    # DEVS
    print("Rafael Martinez")


if __name__ == '__main__':
    main()
