@echo off

:: Wait for 3 seconds
timeout /t 1 /nobreak >nul

:: Close the command prompt window
taskkill /f /im cmd.exe
