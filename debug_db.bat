@echo off
echo Checking Database Content...
cd backend
node check_interviews.js
echo.
echo IF "Total Interviews Found" is 0, then your database is empty.
echo IF it is greater than 0, then the website is hiding them.
echo.
pause
