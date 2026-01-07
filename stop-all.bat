@echo off
title Smart Local Business - Stop All Services
color 0C

echo ============================================
echo    Smart Local Business - Stopping All
echo ============================================
echo.

echo [INFO] Stopping all services...
echo.

:: Kill all dotnet processes (backend services)
echo Stopping backend services...
taskkill /F /IM dotnet.exe /T 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend services stopped.
) else (
    echo [INFO] No backend services were running.
)

:: Kill node processes on specific ports
echo Stopping frontend...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a 2>nul
)
echo [OK] Frontend stopped.

echo.
echo ============================================
echo    All Services Stopped!
echo ============================================
echo.
pause
