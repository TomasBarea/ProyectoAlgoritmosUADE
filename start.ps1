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
deactivate

# ===== Verificar Node.js (nvm) =====
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Node.js no está instalado. Instalando nvm y Node 18..."

    Invoke-WebRequest https://github.com/coreybutler/nvm-windows/releases/download/1.1.11/nvm-setup.exe -OutFile "nvm-setup.exe"
    Start-Process -Wait "nvm-setup.exe"

    $env:NVM_HOME = "$env:ProgramFiles\nvm"
    $env:NVM_SYMLINK = "$env:ProgramFiles\nodejs"

    & "$env:NVM_HOME\nvm.exe" install 18.17.1
    & "$env:NVM_HOME\nvm.exe" use 18.17.1
} else {
    Write-Host "✅ Node.js ya está instalado."
}



# ===== FRONTEND =====
Write-Host "`n🌐 Frontend: verificando dependencias..."
if (!(Test-Path "frontend/node_modules")) {
    Set-Location frontend
    npm install
    Set-Location ..
}

# ===== Iniciar ambos servidores =====

Write-Host "`n🧠 Levantando backend (Flask)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; ./venv/Scripts/Activate.ps1; python app.py"

Write-Host "`n💻 Levantando frontend (Vite)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n✅ Proyecto corriendo. Backend en http://localhost:5000, Frontend en http://localhost:5173"


