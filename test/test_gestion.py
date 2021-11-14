from Gestion.models import Categoria,Marca
import pytest

#Pruebas de Categoria
@pytest.mark.django_db
def test_categoria_create():
    Categoria.objects.create(
        nombre="Papel"
    )
    assert Categoria.objects.count() == 1

@pytest.mark.django_db
def test_categoria_search():
    Categoria.objects.create(
        nombre="Papel"
    )
    Categoria.objects.create(
        nombre="Lápiz"
    )
    assert Categoria.objects.get(nombre='Papel')
    
@pytest.mark.django_db
def test_categoria_update():
    Categoria.objects.create(
        nombre="Papel"
    )
    Categoria.objects.create(
        nombre="Lápiz"
    )
    query =  Categoria.objects.get(nombre='Papel')
    query.nombre = 'Cartulina'
    query.save()
    assert Categoria.objects.get(nombre='Cartulina')

@pytest.mark.django_db
def  test_categoria_delete():
    Categoria.objects.create(
        nombre="Papel"
    )
    Categoria.objects.create(
        nombre="Lápiz"
    )
    assert Categoria.objects.count()==2
    query =  Categoria.objects.get(nombre='Papel')
    query.delete()
    assert Categoria.objects.count()==1

#Pruebas de Marcas
@pytest.mark.django_db
def test_marca_create():
    Marca.objects.create(
        nombre="Norma"
    )
    assert Marca.objects.count() == 1

@pytest.mark.django_db
def test_marca_search():
    Marca.objects.create(
        nombre="Norma"
    )
    Marca.objects.create(
        nombre="Primsa Color"
    )
    assert Marca.objects.get(nombre='Norma')
    
@pytest.mark.django_db
def test_marca_update():
    Marca.objects.create(
        nombre="Norma"
    )
    Marca.objects.create(
        nombre="Prisma Color"
    )
    query =  Marca.objects.get(nombre='Norma')
    query.nombre = 'Repograf'
    query.save()
    assert Marca.objects.get(nombre='Repograf')

@pytest.mark.django_db
def  test_marca_delete():
    Marca.objects.create(
        nombre="Norma"
    )
    Marca.objects.create(
        nombre="Prisma Color"
    )
    assert Marca.objects.count()==2
    query =  Marca.objects.get(nombre='Norma')
    query.delete()
    assert Marca.objects.count()==1
