Write-Host "`n=== VERIFICANDO INSTALACIONES DE PYTHON Y NODE ===`n"

# ========== INSTALAR PYTHON SI NO EXISTE ==========
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    Write-Host "Instalando Python..."
    $pythonUrl = "https://www.python.org/ftp/python/3.12.3/python-3.12.3-amd64.exe"
    $pythonInstaller = "$env:TEMP\python-installer.exe"
    Invoke-WebRequest -Uri $pythonUrl -OutFile $pythonInstaller
    Start-Process -Wait -FilePath $pythonInstaller -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1 Include_test=0"
    Remove-Item $pythonInstaller
} else {
    Write-Host "Python ya está instalado"
}

# ========== INSTALAR NODE SI NO EXISTE ==========
$node = Get-Command node -ErrorAction SilentlyContinue
$flag = $env:SETUP_NODE_INSTALLED

if (-not $node) {
    if (-not $flag) {
        Write-Host "Instalando Node.js..."
        $nodeUrl = "https://nodejs.org/dist/v18.18.2/node-v18.18.2-x64.msi"
        $nodeInstaller = "$env:TEMP\node-installer.msi"
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller
        Start-Process -Wait -FilePath "msiexec.exe" -ArgumentList "/i `"$nodeInstaller`" /quiet /norestart"
        Remove-Item $nodeInstaller

        Write-Host "`nReiniciando script en nueva ventana para aplicar instalación de Node.js..."
        $env:SETUP_NODE_INSTALLED = "true"
        Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy Bypass", "-File `"$PSCommandPath`"", "-WorkingDirectory `"$PWD`"" -Environment @{ SETUP_NODE_INSTALLED = "true" }
        exit
    } else {
        Write-Host "⚠️ Node.js fue instalado pero aún no se reconoce. Por favor, cerrá y reabrí PowerShell manualmente."
        Pause
        exit
    }
} else {
    Write-Host "Node.js ya está instalado"
}

# ========== BACKEND ==========
Write-Host "`n=== CONFIGURANDO BACKEND ==="
Set-Location backend

python -m venv venv
& .\venv\Scripts\Activate.ps1

Write-Host "--- Instalando dependencias del backend ---"
if (Test-Path requirements.txt) {
    pip install --upgrade pip
    pip install -r requirements.txt
} else {
    Write-Host "No se encontró requirements.txt"
}

# No hace falta "deactivate" en PowerShell
Set-Location ..

# ========== FRONTEND ==========
Write-Host "`n=== CONFIGURANDO FRONTEND ==="
Set-Location frontend

# Limpiar carpeta bloqueada .vite/deps si existe
$depsPath = "node_modules\.vite\deps"
if (Test-Path $depsPath) {
    try {
        Remove-Item -Recurse -Force -ErrorAction Stop $depsPath
        Write-Host "--- Se eliminó carpeta .vite/deps bloqueada ---"
    } catch {
        Write-Host "No se pudo eliminar .vite/deps: $_"
    }
}

if (Test-Path package.json) {
    npm install
} else {
    Write-Host "No se encontró package.json"
}

Set-Location ..

Write-Host ""
Write-Host "=== INICIANDO SERVIDORES ==="
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; .\venv\Scripts\Activate.ps1; python app.py'
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; npm run dev'

Write-Host ""
Write-Host "SERVIDORES INICIADOS - TODO LISTO"
Pause
