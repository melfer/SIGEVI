from Inventario.models import Producto
from Personas.models import Proveedor
from Gestion.models import Categoria,Marca
from Inventario.models import Producto
import pytest

@pytest.mark.django_db
def test_producto_buscar():
    Categoria.objects.create(
        nombre="Papel"
    )
    Categoria.objects.create(
        nombre="Carton"
    )
    Marca.objects.create(
        nombre="Norma"
    )
    Marca.objects.create(
        nombre="Repograf"
    )
    Proveedor.objects.create(
        NIT = '804441-a',
        razonSocial = 'compulagp',
        direccionEmpresa = 'Calle 103 No. 69b-43',
        direccionVenta = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
    )
    Proveedor.objects.create(
        NIT = '804441-b',
        razonSocial = 'TEST',
        direccionEmpresa = 'Calle 103 No. 69b-43',
        direccionVenta = 'Carrera 10 No. 9-38',
        telefono = '3188888888',
        correo = 'test@mail.com',
    )
    Producto.objects.create(
        categoria = Categoria.objects.get(nombre="Papel"),
        nombre='Papel bond',
        cantidad = '10',
        uniades = 'unidades',
        precio_compra = '500',
        proveedor = Proveedor.objects.get(NIT='804441-a'),
        marca = Marca.objects.get(nombre='Norma')
    )
    Producto.objects.create(
        categoria = Categoria.objects.get(nombre="Carton"),
        nombre='Carton Paja',
        cantidad = '10',
        uniades = 'unidades',
        precio_compra = '500',
        proveedor = Proveedor.objects.get(NIT='804441-b'),
        marca = Marca.objects.get(nombre='Repograf')
    )
    assert Producto.objects.get(nombre="Papel bond")
    
@pytest.mark.django_db
def test_producto_create():
    Categoria.objects.create(
        nombre="Papel"
    )
    Marca.objects.create(
        nombre="Norma"
    )
    Proveedor.objects.create(
        NIT = '804441-a',
        razonSocial = 'compulagp',
        direccionEmpresa = 'Calle 103 No. 69b-43',
        direccionVenta = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
    )
    Producto.objects.create(
        categoria = Categoria.objects.get(nombre="Papel"),
        nombre='Papel bond',
        cantidad = '10',
        uniades = 'unidades',
        precio_compra = '500',
        proveedor = Proveedor.objects.get(NIT='804441-a'),
        marca = Marca.objects.get(nombre='Norma')
    )
    assert Producto.objects.count() == 1

@pytest.mark.django_db
def test_producto_actualizar():
    Categoria.objects.create(
        nombre="Papel"
    )
    Marca.objects.create(
        nombre="Norma"
    )
    Proveedor.objects.create(
        NIT = '804441-a',
        razonSocial = 'compulagp',
        direccionEmpresa = 'Calle 103 No. 69b-43',
        direccionVenta = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
    )

    Producto.objects.create(
        categoria = Categoria.objects.get(nombre="Papel"),
        nombre='Papel bond',
        cantidad = '10',
        uniades = 'unidades',
        precio_compra = '500',
        proveedor = Proveedor.objects.get(NIT='804441-a'),
        marca = Marca.objects.get(nombre='Norma')
    )
    query = Producto.objects.get(nombre="Papel bond")
    query.nombre = "Papel cometa"
    query.save()
    assert Producto.objects.get(nombre="Papel cometa")


@pytest.mark.django_db
def test_producto_eliminar():
    Categoria.objects.create(
        nombre="Papel"
    )
    Marca.objects.create(
        nombre="Norma"
    )
    Proveedor.objects.create(
        NIT = '804441-a',
        razonSocial = 'compulagp',
        direccionEmpresa = 'Calle 103 No. 69b-43',
        direccionVenta = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
    )
    Producto.objects.create(
        categoria = Categoria.objects.get(nombre="Papel"),
        nombre='Papel bond',
        cantidad = '10',
        uniades = 'unidades',
        precio_compra = '500',
        proveedor = Proveedor.objects.get(NIT='804441-a'),
        marca = Marca.objects.get(nombre='Norma')
    )
    query = Producto.objects.get(nombre = 'Papel bond')
    query.delete()
    assert Producto.objects.count() == 0