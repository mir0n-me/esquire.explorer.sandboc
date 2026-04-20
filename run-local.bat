@echo off
cd /d "%~dp0"
cd frontend
rem call npm run lib:local
cd ..
start "Esquire sandbox [local]" npm run dev
