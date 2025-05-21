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
        max_precio = float(request.args.get('precio', 0))
        file_path = os.path.join(os.path.dirname(__file__), 'productos.json')
        with open(file_path, encoding='utf-8') as f:
            productos = json.load(f)
        filtrados = [p for p in productos if p['precio'] < max_precio]
        return jsonify(filtrados)
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

    return jsonify({"mensaje": "Datos válidos ✅"})


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

if __name__ == '__main__':
    app.run(debug=True)
