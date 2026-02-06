@echo off
echo ==========================================
echo 1. CLEANING UP...
echo ==========================================
taskkill /F /IM node.exe
timeout /t 2 >nul

echo.
echo ==========================================
echo 2. INSTALLING BACKEND DEPENDENCIES...
echo ==========================================
cd backend
call npm install
cd ..

echo.
echo ==========================================
echo 3. INSTALLING FRONTEND DEPENDENCIES...
echo ==========================================
cd frontend
call npm install
cd ..

echo.
echo ==========================================
echo 4. STARTING SERVERS...
echo ==========================================

:: Start Backend
start "Backend Server" cmd /k "cd backend && npm start"

:: Start Frontend
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo DONE!
echo ==========================================
echo Please wait for the new windows to say "Server running" and "Vite data".
echo Then open http://localhost:5173
pause
