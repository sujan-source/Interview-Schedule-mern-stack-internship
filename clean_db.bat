@echo off
echo Cleaning MongoDB Lock Files...
if exist "mongo_data\mongod.lock" del "mongo_data\mongod.lock"
if exist "mongo_data\WiredTiger.lock" del "mongo_data\WiredTiger.lock"
echo Done. You can now try 'start_db.bat' again.
pause
