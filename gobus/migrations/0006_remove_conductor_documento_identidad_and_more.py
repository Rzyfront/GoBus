# Generated by Django 5.1.3 on 2024-11-13 19:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gobus', '0005_remove_pasajero_usuario_conductor_apellido_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conductor',
            name='documento_identidad',
        ),
        migrations.RemoveField(
            model_name='pasajero',
            name='documento_identidad',
        ),
    ]
