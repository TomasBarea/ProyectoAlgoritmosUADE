from flask import Flask, send_from_directory, jsonify, request
import json
import os
import re  

app = Flask(__name__)

@app.route('/index.html')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/Styles/<path:filename>')
def styles(filename):  
    return send_from_directory('Styles', filename)

@app.route('/Pages/<path:filename>')
def pages(filename):
    return send_from_directory('Pages', filename)

@app.route('/filtrar', methods=['GET'])
def filtrar():
    try:
        max_precio = float(request.args.get('precio', 0))
        file_path = os.path.join('static', 'productos.json')  #
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

if __name__ == '__main__':
    app.run(debug=True)
