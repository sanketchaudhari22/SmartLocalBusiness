@echo off
title Smart Local Business - Startup Script
color 0A

echo ============================================
echo    Smart Local Business - Starting All
echo ============================================
echo.

:: Set the base path
set BASE_PATH=%~dp0

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

:: Check if .NET is installed
where dotnet >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] .NET SDK is not installed. Please install .NET SDK first.
    echo Download from: https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

echo [INFO] Prerequisites check passed!
echo.

echo [INFO] Starting Backend Microservices...
echo.

:: Start UserService (Port 5000)
echo [1/7] Starting UserService on port 5000...
start "UserService - Port 5000" cmd /k "cd /d %BASE_PATH%Backend\Services\UserService && dotnet run --urls=http://localhost:5000"
timeout /t 3 /nobreak >nul

:: Start BusinessService (Port 5001)
echo [2/7] Starting BusinessService on port 5001...
start "BusinessService - Port 5001" cmd /k "cd /d %BASE_PATH%Backend\Services\BusinessService && dotnet run --urls=http://localhost:5001"
timeout /t 3 /nobreak >nul

:: Start BookingService (Port 5002)
echo [3/7] Starting BookingService on port 5002...
start "BookingService - Port 5002" cmd /k "cd /d %BASE_PATH%Backend\Services\BookingService && dotnet run --urls=http://localhost:5002"
timeout /t 3 /nobreak >nul

:: Start SearchService (Port 5003)
echo [4/7] Starting SearchService on port 5003...
start "SearchService - Port 5003" cmd /k "cd /d %BASE_PATH%Backend\Services\SearchService && dotnet run --urls=http://localhost:5003"
timeout /t 3 /nobreak >nul

:: Start ReviewService (Port 5004)
echo [5/7] Starting ReviewService on port 5004...
start "ReviewService - Port 5004" cmd /k "cd /d %BASE_PATH%Backend\Services\ReviewService && dotnet run --urls=http://localhost:5004"
timeout /t 3 /nobreak >nul

:: Start API Gateway (Port 5005)
echo [6/7] Starting API Gateway on port 5005...
start "API Gateway - Port 5005" cmd /k "cd /d %BASE_PATH%Backend\Services\ApiGateway && dotnet run --urls=http://localhost:5005"
timeout /t 5 /nobreak >nul

echo.
echo [INFO] Starting Frontend...
echo.

:: Start Frontend (Port 3000)
echo [7/7] Starting Frontend on port 3000...
start "Frontend - Port 3000" cmd /k "cd /d %BASE_PATH%frontend && npm run dev"

echo.
echo ============================================
echo    All Services Started Successfully!
echo ============================================
echo.
echo  Backend Services:
echo    - UserService:     http://localhost:5000
echo    - BusinessService: http://localhost:5001
echo    - BookingService:  http://localhost:5002
echo    - SearchService:   http://localhost:5003
echo    - ReviewService:   http://localhost:5004
echo    - API Gateway:     http://localhost:5005
echo.
echo  Frontend:
echo    - Web App:         http://localhost:3000
echo.
echo  API Documentation:
echo    - Swagger UI:      http://localhost:5005/swagger
echo.
echo ============================================
echo.
echo Press any key to open the application in browser...
pause >nul

:: Open browser
start http://localhost:3000

echo.
echo To stop all services, close all command windows or run stop-all.bat
echo.
pause
