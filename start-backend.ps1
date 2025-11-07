# Start Backend Only
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\backend"
npm run start:dev
