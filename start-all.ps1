# Project Nexus - Start All Services
# This script starts both backend and frontend

Write-Host "🚀 Starting Project Nexus..." -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "📦 Starting Backend Server..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run start:dev"

# Wait a bit for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "🎨 Starting Frontend Application..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

# Show information
Write-Host ""
Write-Host "✅ Both services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend:  http://localhost:4000" -ForegroundColor White
Write-Host "📍 API Docs: http://localhost:4000/api/docs" -ForegroundColor White
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
