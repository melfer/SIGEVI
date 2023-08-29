# Generated by Django 4.1.7 on 2023-04-20 17:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Gestion', '0001_initial'),
        ('Personas', '0001_initial'),
        ('Operaciones', '0002_alter_detallecotizacion_producto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_by', models.CharField(default='root', max_length=50)),
                ('total', models.IntegerField(default=0)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Personas.cliente')),
            ],
        ),
        migrations.CreateModel(
            name='ProductoVenta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField(default=0)),
                ('subtotal', models.IntegerField(default=0)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Gestion.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Operaciones.venta')),
            ],
        ),
    ]
