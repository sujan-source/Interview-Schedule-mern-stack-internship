@echo off
echo ==========================================
echo       MONGODB STARTUP SERVICE
echo ==========================================
echo [INFO] MongoDB v8.2.2 detected.
echo [INFO] Database will use folder: %~dp0mongo_data
echo [INFO] LEAVE THIS WINDOW OPEN while using the app.
echo.

:: Ensure data directory exists
if not exist "%~dp0mongo_data" mkdir "%~dp0mongo_data"

:: Start MongoDB
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath="%~dp0mongo_data"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] MongoDB failed to start.
    echo 1. Check if another MongoDB window is already open.
    echo 2. Run this script as Administrator if it fails.
    pause
)
