from Personas.models import Cliente, Proveedor
import pytest

#Pruebas de Cliente
def test_render_view_cliente_main(client):
    resp = client.get('/personas/clientes/')
    assert resp.status_code ==200

def test_render_view_cliente_nuevo(client):
    resp = client.get('/personas/clientes/nuevo/')
    assert resp.status_code ==200

@pytest.mark.django_db
def test_cliente_creacion():
    assert Cliente.objects.count() == 0
    assert Cliente.objects.create(
        identificacion = '1234567890',
        nombre = 'Ana',
        apellido = 'Frank',
        direccion = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
        esFrecuente = True
    )
    assert Cliente.objects.count() == 1

@pytest.mark.django_db
def test_cliente_buscar(client):
    assert Cliente.objects.count() == 0
    assert Cliente.objects.create(
        identificacion = '1234567890',
        nombre = 'Ana',
        apellido = 'Frank',
        direccion = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
        esFrecuente = True
    )
    assert Cliente.objects.count() == 1
    assert Cliente.objects.create(
        identificacion = '123456789',
        nombre = 'Charles',
        apellido = 'Darwin',
        direccion = 'Carrera 10 No. 9-38',
        telefono = '3188888888',
        correo = 'charlesdarwin@mail.com',
        esFrecuente = True
    )
    assert Cliente.objects.count() == 2
    assert Cliente.objects.get(identificacion = '1234567890')
    
@pytest.mark.django_db
def test_cliente_update():
    Cliente.objects.create(
        identificacion = '1234567890',
        nombre = 'Ana',
        apellido = 'Frank',
        direccion = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
        esFrecuente = True
    )
    query = Cliente.objects.get(identificacion = '1234567890')
    query.nombre = "Pepe"
    query.save()
    assert Cliente.objects.get(nombre = 'Pepe')

@pytest.mark.django_db
def test_cliente_delete():
    assert Cliente.objects.count() == 0
    Cliente.objects.create(
        identificacion = '1234567890',
        nombre = 'Ana',
        apellido = 'Frank',
        direccion = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
        esFrecuente = True
    )
    Cliente.objects.create(
        identificacion = '123456789',
        nombre = 'Charles',
        apellido = 'Darwin',
        direccion = 'Carrera 10 No. 9-38',
        telefono = '3188888888',
        correo = 'charlesdarwin@mail.com',
        esFrecuente = True
    )
    assert Cliente.objects.count() == 2
    query = Cliente.objects.get(nombre = "Ana")
    query.delete()
    assert Cliente.objects.count()==1

#Pruebas de Proveedores


@pytest.mark.django_db
def test_proveedor_creacion():
    assert Proveedor.objects.count() == 0
    assert Proveedor.objects.create(
        NIT = '804441-a',
        razonSocial = 'compulagp',
        direccionEmpresa = 'Calle 103 No. 69b-43',
        direccionVenta = 'Carrera 10 No. 9-38',
        telefono = '3177777777',
        correo = 'anafrank@mail.com',
    )
    assert Proveedor.objects.count() == 1

@pytest.mark.django_db
def test_proveedor_buscar():
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
        direccionEmpresa = 'Calle 104 No. 69b-43',
        direccionVenta = 'Carrera 130 No. 9-38',
        telefono = '32222227',
        correo = 'test@mail.com',
    )
    assert Proveedor.objects.get(NIT = '804441-b')

@pytest.mark.django_db
def test_proveedor_actualizar():
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
        direccionEmpresa = 'Calle 104 No. 69b-43',
        direccionVenta = 'Carrera 130 No. 9-38',
        telefono = '32222227',
        correo = 'test@mail.com',
    )
    query =  Proveedor.objects.get(NIT = '804441-a')
    query.razonSocial = "CompraTEC"
    query.save()
    assert Proveedor.objects.get(razonSocial='CompraTEC')

@pytest.mark.django_db
def test_proveedor_eliminar():
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
        direccionEmpresa = 'Calle 104 No. 69b-43',
        direccionVenta = 'Carrera 130 No. 9-38',
        telefono = '32222227',
        correo = 'test@mail.com',
    )
    query =  Proveedor.objects.get(NIT = '804441-a')
    query.razonSocial = "CompraTEC"
    query.delete()
    assert Proveedor.objects.count()==1