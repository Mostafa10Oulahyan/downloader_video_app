#!/bin/bash

# Quick Start Script for URL Downloader
# This script starts both the Python backend and Next.js frontend

echo "=========================================="
echo "  URL Downloader - Quick Start"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null
then
    echo "ERROR: Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "ERROR: Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "WARNING: ffmpeg is not installed. Some conversions may fail."
    echo "Install with: winget install ffmpeg (Windows) or brew install ffmpeg (macOS)"
    echo ""
fi

echo "Starting URL Downloader..."
echo ""

# Start Python backend in background
echo "[1/2] Starting Python backend on http://localhost:8000..."
cd python_backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv venv 2>/dev/null || python3 -m venv venv
fi

# Activate virtual environment and install dependencies
if [ -f "venv/Scripts/activate" ]; then
    # Windows
    source venv/Scripts/activate
elif [ -f "venv/bin/activate" ]; then
    # macOS/Linux
    source venv/bin/activate
fi

# Install dependencies if not already installed
if ! python -c "import yt_dlp" 2>/dev/null; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt -q
fi

# Start FastAPI server in background
python server.py &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID)"

cd ..

# Wait for backend to start
echo "Waiting for backend to be ready..."
sleep 3

# Start Next.js frontend
echo ""
echo "[2/2] Starting Next.js frontend on http://localhost:3000..."

# Install npm dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Start Next.js dev server
npm run dev

# Cleanup on exit
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM
