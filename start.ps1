# Set-ExecutionPolicy RemoteSigned

Write-Host "🚀 Iniciando ProyectoAlgoritmosUADE..."

# ===== BACKEND =====
if (!(Test-Path "backend/venv")) {
    Write-Host "📦 Backend: creando entorno virtual..."
    python -m venv backend/venv
}

Write-Host "📦 Backend: instalando dependencias..."
& backend/venv/Scripts/Activate.ps1
pip install --upgrade pip
pip install -r backend/requirements.txt

# ===== NODE =====
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ npm no está disponible. Instalando Node.js..."
    Invoke-WebRequest https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi -OutFile node-setup.msi
    Start-Process -Wait msiexec.exe -ArgumentList "/i node-setup.msi /quiet"
} else {
    Write-Host "✅ npm detectado: $((npm -v))"
}

# ===== FRONTEND =====
Write-Host "`n🌐 Frontend: instalando dependencias..."
Set-Location frontend
$npmResult = npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Error al instalar dependencias de frontend."
    Read-Host "Presioná ENTER para salir"
    exit 1
}
Set-Location ..

# ===== Iniciar ambos servidores =====
Write-Host "`n🧠 Levantando backend (Flask)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; ./venv/Scripts/Activate.ps1; python app.py"

Write-Host "`n💻 Levantando frontend (Vite)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n✅ Proyecto corriendo. Backend en http://localhost:5000, Frontend en http://localhost:5173"
Read-Host "`nPresioná ENTER para salir"
