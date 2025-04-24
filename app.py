from flask import Flask, send_from_directory, jsonify, request 
import json
import os

app = Flask(__name__)

@app.route('/')
def index(): return send_from_directory('.', 'index.html')

@app.route('/Styles/<path:filename>')
def Styles(filename): return send_from_directory('Styles',filename)

@app.route('/Pages/<path:filename>')
def pages(filename): return send_from_directory('Pages', filename)

@app.route('/filtrar', methods=['GET']) 
def filtrar(): 
    max_precio = float(request.args.get('precio', 0)) 
    with open('/static/productos.json', encoding='utf-8') as f: 
        productos = json.load(f) 
    filtrados = list(filter(lambda p: p['precio'] < max_precio, productos)) 
    return jsonify(filtrados)

if __name__ == '__main__':  
    app.run(debug=True)
