@echo off
cd /d "%~dp0"
cd frontend
call npm run lib:yalc
cd ..
start "Esquire sandbox [yalc]" npm run dev
