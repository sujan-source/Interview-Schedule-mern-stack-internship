@echo off
echo Starting Interview Schedul@echo off
echo Stopping old servers...
taskkill /F /IM node.exe >nul 2>&1
echo Starting Project...
start "Backend" cmd /k "cd backend && npm start"
start "Frontend" cmd /k "cd frontend && npm run dev"

echo Servers are starting...
echo Once started, open http://localhost:5173 in your browser.
pause
