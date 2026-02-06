@echo off
echo Starting Diagnostic... > mongo_diag.log
echo Date: %DATE% %TIME% >> mongo_diag.log
echo. >> mongo_diag.log

echo [CHECK 1] Checking PATH for mongod... >> mongo_diag.log
mongod --version >> mongo_diag.log 2>&1
echo Result: %errorlevel% >> mongo_diag.log
echo. >> mongo_diag.log

echo [CHECK 2] Checking common folders... >> mongo_diag.log
if exist "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" (echo Found 8.0 >> mongo_diag.log) else (echo Not found 8.0 >> mongo_diag.log)
if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" (echo Found 7.0 >> mongo_diag.log) else (echo Not found 7.0 >> mongo_diag.log)
if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (echo Found 6.0 >> mongo_diag.log) else (echo Not found 6.0 >> mongo_diag.log)
if exist "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" (echo Found 5.0 >> mongo_diag.log) else (echo Not found 5.0 >> mongo_diag.log)
if exist "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" (echo Found 4.4 >> mongo_diag.log) else (echo Not found 4.4 >> mongo_diag.log)
echo. >> mongo_diag.log

echo [CHECK 3] Checking if port 27017 is in use... >> mongo_diag.log
netstat -ano | findstr :27017 >> mongo_diag.log 2>&1
echo. >> mongo_diag.log

echo Diagnostic Complete. Please tell the AI you have run this script.
pause
