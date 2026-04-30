$mcpPath = "C:\Users\Lenovo\AppData\Local\Python\pythoncore-3.14-64\Scripts\notebooklm-mcp.exe"

$mcpEntry = [PSCustomObject]@{ command = $mcpPath; type = "stdio" }

# Actualizar claude_desktop_config.json
$cfg = "$env:APPDATA\Claude\claude_desktop_config.json"
if (Test-Path $cfg) {
    $obj = Get-Content $cfg -Raw | ConvertFrom-Json
    if (-not $obj.mcpServers) { $obj | Add-Member -MemberType NoteProperty -Name mcpServers -Value ([PSCustomObject]@{}) }
    $obj.mcpServers | Add-Member -MemberType NoteProperty -Name "notebooklm-mcp" -Value $mcpEntry -Force
    $obj | ConvertTo-Json -Depth 10 | Set-Content $cfg -Encoding UTF8
    Write-Host "OK: claude_desktop_config.json actualizado" -ForegroundColor Green
} else {
    @{ mcpServers = @{ "notebooklm-mcp" = $mcpEntry } } | ConvertTo-Json -Depth 10 | Set-Content $cfg -Encoding UTF8
    Write-Host "OK: claude_desktop_config.json creado" -ForegroundColor Green
}

# Actualizar settings.json de Claude Code
$cfg2 = "$env:USERPROFILE\.claude\settings.json"
if (Test-Path $cfg2) {
    $obj2 = Get-Content $cfg2 -Raw | ConvertFrom-Json
    if (-not $obj2.mcpServers) { $obj2 | Add-Member -MemberType NoteProperty -Name mcpServers -Value ([PSCustomObject]@{}) }
    $obj2.mcpServers | Add-Member -MemberType NoteProperty -Name "notebooklm-mcp" -Value $mcpEntry -Force
    $obj2 | ConvertTo-Json -Depth 10 | Set-Content $cfg2 -Encoding UTF8
    Write-Host "OK: settings.json actualizado" -ForegroundColor Green
} else {
    @{ mcpServers = @{ "notebooklm-mcp" = $mcpEntry } } | ConvertTo-Json -Depth 10 | Set-Content $cfg2 -Encoding UTF8
    Write-Host "OK: settings.json creado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Listo! Ahora reinicia Cowork/Claude Desktop." -ForegroundColor Cyan
