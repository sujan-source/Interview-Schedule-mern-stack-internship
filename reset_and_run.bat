@echo off
echo ==========================================
echo STOPPING OLD SERVERS...
echo ==========================================
taskkill /F /IM node.exe
echo.
echo Waiting for cleanup...
timeout /t 3
echo.

echo ==========================================
echo PROVISIONING FRESH START...
echo ==========================================

:: Start Backend
start "Backend Server" cmd /k "cd backend && npm start"

:: Start Frontend
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo SERVERS RESTARTED!
echo ==========================================
echo Please wait 10 seconds, then:
echo 1. Close your browser tab.
echo 2. Open a NEW tab.
echo 3. Go to http://localhost:5173
echo.
pause
