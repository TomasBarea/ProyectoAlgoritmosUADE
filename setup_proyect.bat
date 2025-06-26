@echo off
echo === INICIANDO INSTALACION DE DEPENDENCIAS ===

:: =============================
:: BACKEND SETUP
:: =============================
cd backend
echo --- Creando entorno virtual ---
python -m venv venv

echo --- Instalando dependencias del backend ---
call venv\Scripts\activate
if exist requirements.txt (
    pip install --upgrade pip
    pip install -r requirements.txt
) else (
    echo No se encontro requirements.txt
)
deactivate
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
cd ..

:: =============================
:: INICIAR BACK Y FRONT
:: =============================

:: Iniciar backend en nueva ventana
start "Backend" cmd /k "cd backend && call venv\Scripts\activate && python app.py"

:: Iniciar frontend en nueva ventana
start "Frontend" cmd /k "cd frontend && npm run dev"

echo === SERVIDORES INICIADOS ===
pause
