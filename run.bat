@echo off

rem                                                            
rem  This starts both backend (nodemon) and frontend (ng serve) concurrently. The frontend uses frontend/node_modules/ which already has the yalc link wired up.
rem
rem  One caveat: if you ever run npm install inside frontend/ directly, it can overwrite the yalc link. To restore it:
rem  cd frontend
rem  npm run lib:local   # re-links yalc
rem 


start "Esqurie Explorer sandbox" npm run dev 
