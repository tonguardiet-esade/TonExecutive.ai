# ============================================================
# install-notebooklm-mcp.ps1
# Instalador automático de NotebookLM MCP CLI para Claude/Cowork
# ============================================================
# Ejecutar como: powershell -ExecutionPolicy Bypass -File install-notebooklm-mcp.ps1
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NotebookLM MCP CLI - Instalador" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ---- PASO 1: Verificar Python ----
Write-Host "[1/5] Verificando Python..." -ForegroundColor Yellow

$pythonCmd = $null
foreach ($cmd in @("python", "python3", "py")) {
    try {
        $ver = & $cmd --version 2>&1
        if ($ver -match "Python 3") {
            $pythonCmd = $cmd
            Write-Host "  OK: $ver ($cmd)" -ForegroundColor Green
            break
        }
    } catch {}
}

if (-not $pythonCmd) {
    Write-Host "  ERROR: Python 3 no encontrado." -ForegroundColor Red
    Write-Host "  Instala Python desde https://python.org/downloads/ y vuelve a ejecutar este script." -ForegroundColor Red
    exit 1
}

# ---- PASO 2: Instalar uv (gestor de paquetes recomendado) ----
Write-Host ""
Write-Host "[2/5] Verificando/Instalando uv..." -ForegroundColor Yellow

$uvInstalled = $false
try {
    $uvVer = & uv --version 2>&1
    if ($uvVer -match "uv") {
        Write-Host "  OK: uv ya instalado - $uvVer" -ForegroundColor Green
        $uvInstalled = $true
    }
} catch {}

if (-not $uvInstalled) {
    Write-Host "  Instalando uv via pip..." -ForegroundColor Yellow
    & $pythonCmd -m pip install uv --quiet
    Write-Host "  OK: uv instalado" -ForegroundColor Green
}

# ---- PASO 3: Instalar notebooklm-mcp-cli ----
Write-Host ""
Write-Host "[3/5] Instalando notebooklm-mcp-cli..." -ForegroundColor Yellow

try {
    # Intentar con uv primero (más rápido y confiable)
    Write-Host "  Usando: uv tool install notebooklm-mcp-cli" -ForegroundColor Gray
    & uv tool install notebooklm-mcp-cli 2>&1 | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    Write-Host "  OK: notebooklm-mcp-cli instalado con uv" -ForegroundColor Green
} catch {
    Write-Host "  uv falló, intentando con pip..." -ForegroundColor Yellow
    try {
        & $pythonCmd -m pip install notebooklm-mcp-cli --quiet
        Write-Host "  OK: notebooklm-mcp-cli instalado con pip" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR instalando el paquete: $_" -ForegroundColor Red
        exit 1
    }
}

# Verificar que el comando está disponible
$nlmPath = $null
try {
    $nlmPath = (Get-Command nlm -ErrorAction Stop).Source
    Write-Host "  Comando 'nlm' disponible en: $nlmPath" -ForegroundColor Green
} catch {
    # Puede que necesitemos actualizar PATH para uv tools
    $uvToolsPath = "$env:USERPROFILE\.local\bin"
    if (Test-Path $uvToolsPath) {
        $env:PATH = "$uvToolsPath;$env:PATH"
        try {
            $nlmPath = (Get-Command nlm -ErrorAction Stop).Source
            Write-Host "  Comando 'nlm' disponible en: $nlmPath" -ForegroundColor Green
        } catch {
            Write-Host "  AVISO: 'nlm' no detectado en PATH. Es posible que necesites reiniciar la terminal." -ForegroundColor Yellow
        }
    }
}

# Detectar ruta del ejecutable notebooklm-mcp
$nlmMcpPath = $null
try {
    $nlmMcpPath = (Get-Command notebooklm-mcp -ErrorAction Stop).Source
    Write-Host "  Comando 'notebooklm-mcp' en: $nlmMcpPath" -ForegroundColor Green
} catch {
    # Buscar en rutas comunes
    $searchPaths = @(
        "$env:USERPROFILE\.local\bin\notebooklm-mcp.exe",
        "$env:USERPROFILE\.local\bin\notebooklm-mcp",
        "$env:APPDATA\Python\Scripts\notebooklm-mcp.exe",
        "C:\Python312\Scripts\notebooklm-mcp.exe",
        "C:\Python311\Scripts\notebooklm-mcp.exe",
        "C:\Python310\Scripts\notebooklm-mcp.exe"
    )
    foreach ($path in $searchPaths) {
        if (Test-Path $path) {
            $nlmMcpPath = $path
            Write-Host "  'notebooklm-mcp' encontrado en: $nlmMcpPath" -ForegroundColor Green
            break
        }
    }
    if (-not $nlmMcpPath) {
        $nlmMcpPath = "notebooklm-mcp"
        Write-Host "  AVISO: No se encontró ruta exacta, usando 'notebooklm-mcp' (requiere PATH correcto)" -ForegroundColor Yellow
    }
}

# ---- PASO 4: Configurar MCP en Claude ----
Write-Host ""
Write-Host "[4/5] Configurando MCP en Claude..." -ForegroundColor Yellow

# Configurar en Claude Desktop
$claudeConfigDir = "$env:APPDATA\Claude"
$claudeConfigPath = "$claudeConfigDir\claude_desktop_config.json"

if (-not (Test-Path $claudeConfigDir)) {
    New-Item -ItemType Directory -Path $claudeConfigDir -Force | Out-Null
}

$mcpEntry = @{
    command = $nlmMcpPath
    type    = "stdio"
}

if (Test-Path $claudeConfigPath) {
    $config = Get-Content $claudeConfigPath -Raw | ConvertFrom-Json
    if (-not $config.mcpServers) {
        $config | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value @{} -Force
    }
    $config.mcpServers | Add-Member -MemberType NoteProperty -Name "notebooklm-mcp" -Value $mcpEntry -Force
    $config | ConvertTo-Json -Depth 10 | Set-Content $claudeConfigPath -Encoding UTF8
    Write-Host "  OK: MCP añadido a claude_desktop_config.json existente" -ForegroundColor Green
} else {
    $newConfig = @{
        mcpServers = @{
            "notebooklm-mcp" = $mcpEntry
        }
    }
    $newConfig | ConvertTo-Json -Depth 10 | Set-Content $claudeConfigPath -Encoding UTF8
    Write-Host "  OK: claude_desktop_config.json creado con configuración MCP" -ForegroundColor Green
}

# Configurar también en Claude Code settings (~\.claude\settings.json)
$claudeCodeSettingsDir = "$env:USERPROFILE\.claude"
$claudeCodeSettingsPath = "$claudeCodeSettingsDir\settings.json"

if (-not (Test-Path $claudeCodeSettingsDir)) {
    New-Item -ItemType Directory -Path $claudeCodeSettingsDir -Force | Out-Null
}

if (Test-Path $claudeCodeSettingsPath) {
    $settings = Get-Content $claudeCodeSettingsPath -Raw | ConvertFrom-Json
    if (-not $settings.mcpServers) {
        $settings | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value @{} -Force
    }
    $settings.mcpServers | Add-Member -MemberType NoteProperty -Name "notebooklm-mcp" -Value $mcpEntry -Force
    $settings | ConvertTo-Json -Depth 10 | Set-Content $claudeCodeSettingsPath -Encoding UTF8
    Write-Host "  OK: MCP añadido a Claude Code settings.json" -ForegroundColor Green
} else {
    $newSettings = @{
        mcpServers = @{
            "notebooklm-mcp" = $mcpEntry
        }
    }
    $newSettings | ConvertTo-Json -Depth 10 | Set-Content $claudeCodeSettingsPath -Encoding UTF8
    Write-Host "  OK: Claude Code settings.json creado con configuración MCP" -ForegroundColor Green
}

# ---- PASO 4b: Instalar el Skill experto de NotebookLM para Cowork ----
Write-Host ""
Write-Host "[4b] Instalando skill experto de NotebookLM en Cowork..." -ForegroundColor Yellow

# Buscar la carpeta de skills de Cowork/Claude
$skillsBasePaths = @(
    "$env:APPDATA\Claude\local-agent-mode-sessions"
)

$skillInstalled = $false
foreach ($basePath in $skillsBasePaths) {
    if (Test-Path $basePath) {
        # Buscar carpetas de skills (estructura: skills-plugin\*\*\skills\)
        $skillFolders = Get-ChildItem -Path $basePath -Recurse -Directory -Filter "skills" -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -match "skills-plugin" -and (Test-Path "$($_.FullName)\mcp-builder") }

        foreach ($skillFolder in $skillFolders) {
            $targetDir = "$($skillFolder.FullName)\notebooklm"
            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }
            # Copiar el SKILL.md desde la carpeta del usuario
            $sourceSkill = "$PSScriptRoot\notebooklm-SKILL.md"
            if (Test-Path $sourceSkill) {
                Copy-Item $sourceSkill "$targetDir\SKILL.md" -Force
                Write-Host "  OK: Skill instalado en: $targetDir" -ForegroundColor Green
                $skillInstalled = $true
            }
        }
    }
}

if (-not $skillInstalled) {
    Write-Host "  AVISO: No se pudo instalar el skill automaticamente." -ForegroundColor Yellow
    Write-Host "  Copia manualmente 'notebooklm-SKILL.md' como 'SKILL.md' en tu carpeta de skills de Cowork." -ForegroundColor Yellow
}

# ---- PASO 5: Autenticación con Google ----
Write-Host ""
Write-Host "[5/5] Autenticación con Google NotebookLM..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  Se abrirá un navegador para que inicies sesión con tu cuenta de Google." -ForegroundColor Cyan
Write-Host "  Por favor, NO cierres la ventana del navegador hasta completar el login." -ForegroundColor Cyan
Write-Host ""

# Pequeña pausa para que el usuario lea
Start-Sleep -Seconds 2

Write-Host "  Ejecutando: nlm login" -ForegroundColor Gray
Write-Host ""

try {
    # Añadir uv tools al PATH si es necesario
    $uvBin = "$env:USERPROFILE\.local\bin"
    if (Test-Path $uvBin) { $env:PATH = "$uvBin;$env:PATH" }

    & nlm login
    Write-Host ""
    Write-Host "  OK: Autenticación completada" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "  Si el comando 'nlm' no se encontró, ejecuta manualmente:" -ForegroundColor Yellow
    Write-Host "    nlm login" -ForegroundColor White
    Write-Host "  O si usaste pip:" -ForegroundColor Yellow
    Write-Host "    python -m notebooklm_mcp_cli login" -ForegroundColor White
}

# ---- RESUMEN FINAL ----
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALACION COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Configuracion guardada en:" -ForegroundColor White
Write-Host "    - $claudeConfigPath" -ForegroundColor Gray
Write-Host "    - $claudeCodeSettingsPath" -ForegroundColor Gray
Write-Host ""
Write-Host "  IMPORTANTE: Reinicia Claude Desktop / Cowork para que" -ForegroundColor Yellow
Write-Host "  detecte el nuevo servidor MCP." -ForegroundColor Yellow
Write-Host ""
Write-Host "  Comandos utiles:" -ForegroundColor White
Write-Host "    nlm login          -> Autenticar / renovar sesion" -ForegroundColor Gray
Write-Host "    nlm login --check  -> Verificar estado de autenticacion" -ForegroundColor Gray
Write-Host "    nlm setup list     -> Ver herramientas configuradas" -ForegroundColor Gray
Write-Host ""
