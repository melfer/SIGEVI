# Generated by Django 4.1.7 on 2023-04-14 20:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Gestion', '0001_initial'),
        ('Operaciones', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallecotizacion',
            name='producto',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='Gestion.producto'),
        ),
    ]
