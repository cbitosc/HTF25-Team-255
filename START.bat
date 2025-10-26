@echo off
cls
echo ================================================
echo   PROJECT NEXUS - COMPLETE STARTUP
echo ================================================
echo.
echo Starting Backend Server...
cd /d "%~dp0backend"
start "Project Nexus - Backend" cmd /k "npm run start:dev"
echo Backend starting in new window...
echo.
echo Waiting 12 seconds for backend to initialize...
timeout /t 12 /nobreak >nul
echo.
echo Starting Frontend Application...
cd /d "%~dp0frontend"
start "Project Nexus - Frontend" cmd /k "npm run dev"
echo Frontend starting in new window...
echo.
echo Waiting 8 seconds for frontend to initialize...
timeout /t 8 /nobreak >nul
echo.
echo ================================================
echo   APPLICATION READY!
echo ================================================
echo.
echo Backend:  http://localhost:4000/api
echo API Docs: http://localhost:4000/api/docs  
echo Frontend: http://localhost:3000
echo.
echo Opening frontend in browser...
start http://localhost:3000
echo.
echo IMPORTANT: Keep both terminal windows open!
echo Do NOT close them or press Ctrl+C!
echo.
pause
