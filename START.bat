@echo off
title Smart Local Business
color 0B

echo.
echo  =============================================
echo  #                                           #
echo  #      SMART LOCAL BUSINESS                 #
echo  #      Enterprise SaaS Platform             #
echo  #                                           #
echo  =============================================
echo.
echo  Starting all services... Please wait.
echo.

:: Run the main start script
call "%~dp0start-all.bat"
