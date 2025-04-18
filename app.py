from flask import Flask, send_from_directory, jsonify, request 
import json
import os

app = Flask(__name__)

@app.route('/')
def index(): return send_from_directory('.', 'index.html')

@app.route('/Static/style.css')
def indexcss(): return send_from_directory('.', 'style.css')

@app.route('/Pages/path:filename')
def pages(filename): return send_from_directory('Pages', filename)

@app.route('/Styles/path:filename')
def styles(filename): return send_from_directory('Styles', filename)

@app.route('/Utils/path:filename') 
def utils(filename): return send_from_directory('Utils', filename)

@app.route('/img/path:filename') 
def img(filename): return send_from_directory('img', filename)

@app.route('/productos.json') 
def productos(): return send_from_directory('.', 'productos.json')


@app.route('/filtrar', methods=['GET']) 
def filtrar(): 
    max_precio = float(request.args.get('precio', 0)) 
    dolar = 1000 
    with open('productos.json', encoding='utf-8') as f: 
        productos = json.load(f) 
    filtrados = list(filter(lambda p: p['precio'] * dolar < max_precio, productos)) 
    return jsonify(filtrados)

if __name__ == '__main__':  
    app.run(debug=True)
