import json
import pytest

@pytest.fixture
def productos_data():
    with open('productos.json', encoding='utf-8') as f:
        return json.load(f)

def test_acceso_diccionario(productos_data):
    assert "Nike" in productos_data
    assert "Jordan 4 Black cat" in productos_data["Nike"]
    assert productos_data["Nike"]["Jordan 4 Black cat"]["stock"] == 3

def test_tupla_inmutabilidad():
    pedido = ("Jordan 4 Black cat", 2, 400)
    assert pedido[2] == 400
    with pytest.raises(TypeError):
        pedido[1] = 5  # Intentar modificar la tupla debe fallar

def test_recursividad_conteo(productos_data):
    def contar_productos(diccionario):
        total = 0
        for val in diccionario.values():
            if isinstance(val, dict) and 'precio' not in val:
                total += contar_productos(val)
            else:
                total += 1
        return total

    assert contar_productos(productos_data) == 9  # Cambiar si el total cambia
