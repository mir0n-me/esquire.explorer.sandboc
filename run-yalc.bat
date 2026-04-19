@echo off
cd /d "%~dp0"
cd frontend
call npm run lib:local
cd ..
start "Esquire sandbox [yalc]" npm run dev
