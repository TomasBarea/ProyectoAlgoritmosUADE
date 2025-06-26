@echo off
echo === INICIANDO INSTALACION DE DEPENDENCIAS ===

:: Cambiar a carpeta del backend
cd backend
echo --- Instalando dependencias de Python (backend) ---
python -m venv venv
call venv\Scripts\activate
pip install --upgrade pip

:: Instalar librerías del backend
if exist requirements.txt (
    pip install -r requirements.txt
) else (
    echo No se encontró requirements.txt
)

:: Volver a raíz
cd ..

:: Cambiar a carpeta del frontend
cd frontend
echo --- Instalando dependencias de Node (frontend) ---

:: Instalar paquetes npm
if exist package.json (
    npm install
) else (
    echo No se encontró package.json
)

cd ..

echo === INSTALACION COMPLETA ===
pause
