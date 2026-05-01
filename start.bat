@echo off
REM Quick Start Script for URL Downloader (Windows)
REM This script starts both the Python backend and Next.js frontend

echo ==========================================
echo   URL Downloader - Quick Start
echo ==========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if ffmpeg is installed
ffmpeg -version >nul 2>&1
if errorlevel 1 (
    echo WARNING: ffmpeg is not installed. Some conversions may fail.
    echo Install with: winget install ffmpeg
    echo.
)

echo Starting URL Downloader...
echo.

REM Start Python backend in new window
echo [1/2] Starting Python backend on http://localhost:8000...
cd python_backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat

REM Install dependencies if not already installed
python -c "import yt_dlp" >nul 2>&1
if errorlevel 1 (
    echo Installing Python dependencies...
    pip install -r requirements.txt -q
)

REM Start FastAPI server in new window
start "Python Backend" cmd /k "venv\Scripts\activate.bat && python server.py"

cd ..

REM Wait for backend to start
echo Waiting for backend to be ready...
timeout /t 5 /nobreak >nul

REM Start Next.js frontend
echo.
echo [2/2] Starting Next.js frontend on http://localhost:3000...

REM Install npm dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

REM Start Next.js dev server
echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in both windows to stop the servers.
echo.

call npm run dev

pause
