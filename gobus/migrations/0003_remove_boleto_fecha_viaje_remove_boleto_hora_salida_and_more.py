# Generated by Django 5.1.3 on 2024-11-12 03:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gobus', '0002_alter_pasajero_usuario_delete_usuario'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boleto',
            name='fecha_viaje',
        ),
        migrations.RemoveField(
            model_name='boleto',
            name='hora_salida',
        ),
        migrations.AlterField(
            model_name='boleto',
            name='asiento',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='boleto',
            name='pasajero',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='boleto',
            name='precio',
            field=models.DecimalField(decimal_places=2, max_digits=6),
        ),
        migrations.AlterField(
            model_name='bus',
            name='capacidad',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='bus',
            name='placa',
            field=models.CharField(max_length=10),
        ),
        migrations.CreateModel(
            name='Viaje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_viaje', models.DateField()),
                ('hora_salida', models.TimeField()),
                ('bus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gobus.bus')),
                ('ruta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gobus.ruta')),
            ],
        ),
        migrations.AddField(
            model_name='boleto',
            name='viaje',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='gobus.viaje'),
            preserve_default=False,
        ),
    ]
