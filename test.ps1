Write-Host '=== INICIANDO INSTALACIÓN DE DEPENDENCIAS ==='

# ========== BACKEND ==========
Write-Host '--- Backend: creando entorno virtual ---'
Set-Location backend

python -m venv venv
& .\venv\Scripts\Activate.ps1

Write-Host '--- Backend: instalando dependencias ---'
if (Test-Path requirements.txt) {
    pip install --upgrade pip
    pip install -r requirements.txt
} else {
    Write-Host 'No se encontró requirements.txt'
}

deactivate
Set-Location ..

# ========== FRONTEND ==========
Write-Host '--- Frontend: instalando dependencias ---'
Set-Location frontend
if (Test-Path package.json) {
    npm install
} else {
    Write-Host 'No se encontró package.json'
}
Set-Location ..

# ========== EJECUTAR SERVIDORES EN NUEVAS VENTANAS ==========

# Abrir backend en nueva ventana
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; .\venv\Scripts\Activate.ps1; python app.py'

# Abrir frontend en nueva ventana
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; npm run dev'

Write-Host '=== SERVIDORES INICIADOS ==='
Pause
