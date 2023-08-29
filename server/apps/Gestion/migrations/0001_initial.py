# Generated by Django 4.1.7 on 2023-04-01 21:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Personas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(error_messages={'unique': 'ya existe esta categoria'}, max_length=50, unique=True, verbose_name='Digite nombre de Categoría')),
                ('date_joined', models.DateTimeField(auto_now=True)),
                ('created_by', models.CharField(default='root', max_length=50, verbose_name='Creado por: ')),
            ],
        ),
        migrations.CreateModel(
            name='Marca',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(error_messages={'unique': 'Ya existe esta marca en el sistema'}, max_length=50, unique=True, verbose_name='Digite nombre de la Marca')),
                ('date_joined', models.DateTimeField(auto_now=True)),
                ('created_by', models.CharField(default='root', max_length=50, verbose_name='Creado por: ')),
            ],
        ),
        migrations.CreateModel(
            name='MarcaCategoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_by', models.CharField(default='root', max_length=10)),
                ('date_joined', models.DateTimeField(auto_now=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Gestion.categoria')),
                ('marca', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Gestion.marca')),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50, verbose_name='Ingrese nombre del producto')),
                ('cantidad', models.IntegerField(verbose_name='Indique Cantidad de Producto')),
                ('unidad', models.CharField(choices=[('Unidad', 'Unidad'), ('Docena', 'Docena'), ('Resma', 'Resma'), ('Caja', 'Caja')], default='Unidad', max_length=12, verbose_name='Unidades de medida del producto')),
                ('precio_compra', models.IntegerField(verbose_name='Indique el Valor del producto')),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(default='root', max_length=50, verbose_name='Creado por: ')),
                ('proveedor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='Personas.proveedor', verbose_name='Indique el Proveedor: ')),
                ('referencia', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Gestion.marcacategoria')),
            ],
        ),
    ]
