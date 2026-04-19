@echo off
cd /d "%~dp0smock-test"
if not exist node_modules (
    call npm install
    call npx playwright install chromium
)
call npm test
