@echo off
cd /d "%~dp0"
cd frontend
call npm run lib:pkg
cd ..
start "Esquire sandbox [pkg]" npm run dev
