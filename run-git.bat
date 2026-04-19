@echo off
cd /d "%~dp0"
cd frontend
call npm run lib:git
cd ..
start "Esquire sandbox [git]" npm run dev
