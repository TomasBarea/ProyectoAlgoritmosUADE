from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import json
import os
import re  

app = Flask(__name__)
CORS(app)

@app.route('/Home.jsx')
def index():
    return send_from_directory('.', 'Home.jsx')

@app.route('/styles/<path:filename>')
def styles(filename):  
    return send_from_directory('styles', filename)

@app.route('/pages/<path:filename>')
def pages(filename):
    return send_from_directory('pages', filename)

@app.route('/filtrar', methods=['GET'])
def filtrar():
    try:
        max_precio = float(request.args.get('precio', 0))
        file_path = os.path.join('src', 'productos.json')  
        with open(file_path, encoding='utf-8') as f:
            productos = json.load(f)
        filtrados = list(filter(lambda p: p['precio'] < max_precio, productos))
        return jsonify(filtrados)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        return jsonify({"error": "Error al procesar el archivo de productos"}), 500

@app.route('/validar', methods=['GET'])
def validar():
    usuario = request.args.get('usuario', '')
    clave = request.args.get('clave', '')

    regex_usuario = r'^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,30}$'
    regex_clave = r'^.{6,}$'  

    errores = []

    if not re.match(regex_usuario, usuario):
        errores.append("Usuario inválido")

    if not re.match(regex_clave, clave):
        errores.append("Contraseña inválida")

    if errores:
        return jsonify({"errores": errores}), 400

    return jsonify({"mensaje": "Datos válidos ✅"})


@app.route('/cart', methods=['POST', 'GET', 'DELETE'])
def cart():
    try:
        cart = []

        if request.method == 'POST':
          
            item = request.json.get('item')
            if not item:
                raise ValueError("No item provided")
            cart.append(item)
            return jsonify({"message": "Item added to cart", "cart": cart}), 200

        elif request.method == 'GET':
            
            return jsonify({"cart": cart}), 200

        elif request.method == 'DELETE':
           
            item = request.json.get('item')
            if not item:
                raise ValueError("No item provided")
            if item not in cart:
                raise ValueError("Item not found in cart")
            cart.remove(item)
            return jsonify({"message": "Item removed from cart", "cart": cart}), 200

        else:
            return jsonify({"error": "Invalid method"}), 405

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)