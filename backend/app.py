from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import re

app = Flask(__name__)
CORS(app)

@app.route('/api/filtrar', methods=['GET'])
def filtrar():
    try:
        precio = float(request.args.get('precio', 0))
        marca = request.args.get('marca', '').lower()

        print(f"Filtrando por precio: {precio}, marca: {marca}")  

        file_path = os.path.join(os.path.dirname(__file__), 'productos.json')
        with open(file_path, encoding='utf-8') as f:
            productos = json.load(f)

        filtrados = [
            p for p in productos
            if p['precio'] < precio and (marca == '' or p['marca'].lower() == marca)
        ]
        return jsonify(filtrados)
    except Exception as e:
        print("Error en /api/filtrar:", e)  
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/productos', methods=['GET'])
def obtener_productos():
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'productos.json')
        with open(file_path, encoding='utf-8') as f:
            productos = json.load(f)
        return jsonify(productos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/validar', methods=['GET'])
def validar():
    usuario = request.args.get('usuario', '')
    clave = request.args.get('clave', '')

    errores = []
    if not re.match(r'^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,30}$', usuario):
        errores.append("Usuario inválido")
    if not re.match(r'^.{6,}$', clave):
        errores.append("Contraseña inválida")

    if errores:
        return jsonify({"errores": errores}), 400

    return jsonify({"mensaje": "Datos válidos "})


cart_data = []

@app.route('/api/cart', methods=['POST', 'GET', 'DELETE'])
def cart():
    global cart_data

    if request.method == 'POST':
        item = request.json.get('item')
        if not item:
            return jsonify({"error": "No item provided"}), 400
        cart_data.append(item)
        return jsonify({"message": "Item added", "cart": cart_data})

    elif request.method == 'GET':
        return jsonify({"cart": cart_data})

    elif request.method == 'DELETE':
        item = request.json.get('item')
        if item in cart_data:
            cart_data.remove(item)
            return jsonify({"message": "Item removed", "cart": cart_data})
        return jsonify({"error": "Item not found"}), 404



@app.route('/api/stock/<int:producto_id>', methods=['PUT'])
def actualizar_stock(producto_id):
    data = request.get_json()
    nuevo_stock = data.get('stock')

    if nuevo_stock is None or not isinstance(nuevo_stock, int):
        return jsonify({"error": "Stock inválido"}), 400

    file_path = os.path.join(os.path.dirname(__file__), 'productos.json')

    with open(file_path, encoding='utf-8') as f:
        productos = json.load(f)

    producto_encontrado = False
    for p in productos:
        if p['id'] == producto_id:
            p['stock'] = nuevo_stock
            producto_encontrado = True
            break

    if not producto_encontrado:
        return jsonify({"error": "Producto no encontrado"}), 404

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(productos, f, indent=2, ensure_ascii=False)

    return jsonify({"mensaje": "Stock actualizado"}), 200


@app.route('/api/pedido', methods=['POST'])
def guardar_pedido():
    nuevo = request.json 
    with open('pedidos.json', 'r+', encoding='utf-8') as f:
        datos = json.load(f)
        usuario = nuevo['usuario']
        if usuario not in datos:
            datos[usuario] = []
        datos[usuario].append(nuevo)
        f.seek(0)
        json.dump(datos, f, indent=2)
        f.truncate()
    return jsonify({"mensaje": "Pedido guardado correctamente"})



def resumen_por_usuario(pedidos):
    resumen = {}
    for pedido in pedidos:
        clave = (pedido["usuario"], pedido["fecha"])  
        resumen[clave] = resumen.get(clave, 0) + pedido["total"]
    return resumen

def mostrar_categorias(categorias, nivel=0):
    for clave, valor in categorias.items():
        print("  " * nivel + clave)
        if isinstance(valor, dict):
            mostrar_categorias(valor, nivel + 1)
        elif isinstance(valor, list):
            for prod in valor:
                print("  " * (nivel + 1) + prod)




if __name__ == '__main__':
    app.run(debug=True)
