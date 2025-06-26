@echo off
echo === INICIANDO INSTALACION DE DEPENDENCIAS ===

:: =============================
:: BACKEND SETUP
:: =============================
cd backend
echo --- Creando entorno virtual ---
python -m venv venv

echo --- Activando entorno virtual ---
call venv\Scripts\activate

echo --- Instalando dependencias del backend ---
if exist requirements.txt (
    pip install --upgrade pip
    pip install -r requirements.txt
) else (
    echo No se encontro requirements.txt
)

echo --- Iniciando servidor del backend ---
start cmd /k "cd backend && call venv\Scripts\activate && python app.py"

cd ..

:: =============================
:: FRONTEND SETUP
:: =============================
cd frontend
echo --- Instalando dependencias del frontend ---
if exist package.json (
    npm install
) else (
    echo No se encontró package.json
)

echo --- Iniciando servidor del frontend ---
start cmd /k "cd frontend && npm run dev"

cd ..

echo === TODO LISTO ===
pause
