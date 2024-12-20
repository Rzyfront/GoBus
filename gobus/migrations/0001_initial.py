# Generated by Django 5.1.3 on 2024-11-11 19:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Agencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('direccion', models.CharField(max_length=200)),
                ('telefono', models.CharField(max_length=15)),
                ('correo', models.EmailField(max_length=254)),
                ('sitio_web', models.URLField(blank=True, null=True)),
                ('horario_atencion', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Bus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('placa', models.CharField(max_length=10, unique=True)),
                ('capacidad', models.IntegerField()),
                ('tipo', models.CharField(choices=[('EJ', 'Ejecutivo'), ('ES', 'Estándar'), ('VIP', 'VIP')], max_length=50)),
                ('estado', models.CharField(choices=[('disponible', 'Disponible'), ('mantenimiento', 'En Mantenimiento'), ('no_disponible', 'No Disponible')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Conductor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('licencia', models.CharField(max_length=20, unique=True)),
                ('telefono', models.CharField(max_length=15)),
                ('anios_experiencia', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Pasajero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('documento_identidad', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ruta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origen', models.CharField(max_length=100)),
                ('destino', models.CharField(max_length=100)),
                ('distancia', models.DecimalField(decimal_places=2, max_digits=5)),
                ('duracion_estimada', models.DecimalField(decimal_places=2, max_digits=4)),
            ],
        ),
        migrations.CreateModel(
            name='Terminal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('ubicacion', models.CharField(max_length=200)),
                ('telefono', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('contraseña', models.CharField(max_length=128)),
                ('telefono', models.CharField(blank=True, max_length=15, null=True)),
                ('tipo_usuario', models.CharField(choices=[('cliente', 'Cliente'), ('administrador', 'Administrador')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Boleto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_viaje', models.DateField()),
                ('hora_salida', models.TimeField()),
                ('asiento', models.IntegerField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=7)),
                ('estado', models.CharField(choices=[('reservado', 'Reservado'), ('cancelado', 'Cancelado'), ('confirmado', 'Confirmado')], max_length=20)),
                ('pasajero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gobus.pasajero')),
            ],
        ),
        migrations.AddField(
            model_name='pasajero',
            name='usuario',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='gobus.usuario'),
        ),
    ]
