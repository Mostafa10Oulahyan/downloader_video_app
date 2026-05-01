# URL Downloader - Complete Setup Guide

A modern URL downloader application that lets users download videos and audio from 1000+ platforms including YouTube, TikTok, Instagram, Twitter/X, and more.

## Features

✨ **Direct Downloads** - Download videos (MP4) or audio (MP3) with one click  
🌐 **1000+ Platforms** - YouTube, TikTok, Instagram, Twitter/X, Vimeo, SoundCloud, and more  
📊 **Video Information** - See title, description, views, likes, duration before downloading  
🎨 **Modern UI** - Beautiful dark theme with glassmorphism effects  
⚡ **Fast & Efficient** - Powered by yt-dlp for maximum speed  
🔒 **Privacy First** - Files auto-delete after 24 hours  

## Tech Stack

**Frontend:**
- Next.js 16.2 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons

**Backend:**
- Python 3.8+
- FastAPI
- yt-dlp
- uvicorn

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Python** (v3.8 or higher) - [Download](https://www.python.org/)
3. **ffmpeg** - Required for video/audio conversions:
   ```bash
   # Windows (using winget)
   winget install ffmpeg

   # macOS (using Homebrew)
   brew install ffmpeg

   # Linux (Ubuntu/Debian)
   sudo apt install ffmpeg
   ```

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd url-downloader
```

### 2. Frontend Setup (Next.js)

```bash
# Install dependencies
npm install

# Create environment file (already exists as .env.local)
# Make sure it contains:
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Backend Setup (Python)

```bash
# Navigate to backend directory
cd python_backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Verify yt-dlp installation
yt-dlp --version

# Go back to root directory
cd ..
```

## Running the Application

You need to run **both** the frontend and backend servers.

### Terminal 1: Start the Backend (Python)

```bash
cd python_backend

# Activate virtual environment if not already activated
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Start the FastAPI server
python server.py
```

The backend will start on `http://localhost:8000`

### Terminal 2: Start the Frontend (Next.js)

```bash
# In the root directory
npm run dev
```

The frontend will start on `http://localhost:3000`

### Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## Usage

1. **Paste a URL** - Copy any video URL (YouTube, TikTok, Instagram, etc.)
2. **Click "Get Video Info"** - The app will fetch video information including title, description, thumbnail, views, and available qualities
3. **Choose Format** - Switch between Video (MP4) or Audio (MP3) tabs
4. **Select Quality** - Click on your preferred quality option
5. **Download** - The file will download automatically when ready

## Supported Platforms

- **YouTube** - Videos, Shorts, Music
- **TikTok** - Videos
- **Instagram** - Posts, Reels, Stories, IGTV
- **Twitter/X** - Videos
- **Facebook** - Videos, Reels
- **Vimeo** - Videos
- **SoundCloud** - Audio
- **Twitch** - VODs, Clips
- **Reddit** - Videos
- **Dailymotion** - Videos
- **Bilibili** - Videos
- **And 1000+ more platforms**

Full list: https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md

## API Endpoints

The Python backend provides the following REST API endpoints:

### GET /api/health
Health check endpoint

### POST /api/video-info
Get video information without downloading
```json
{
  "url": "https://youtube.com/watch?v=..."
}
```

### POST /api/download
Download video or audio
```json
{
  "url": "https://youtube.com/watch?v=...",
  "format": "mp4",
  "quality": "1080"
}
```

### GET /api/download/{task_id}
Check download status

### GET /api/file/{filename}
Download the completed file

### POST /api/search
Search for videos on YouTube
```json
{
  "query": "funny cats",
  "max_results": 10
}
```

## Configuration

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (python_backend/downloader.py)
```python
DOWNLOAD_DIR = Path("downloads")  # Download location
MAX_FILE_SIZE_MB = 500           # Maximum file size
```

### Auto-cleanup
Files are automatically deleted after 24 hours. Adjust in `server.py`:
```python
cleanup_old_files(max_age_hours=24)
```

## Troubleshooting

### Backend won't start
- **Error: "yt-dlp not installed"**
  ```bash
  pip install yt-dlp
  ```

- **Error: "ffmpeg not found"**
  Install ffmpeg using the instructions in Prerequisites

- **Port 8000 already in use**
  Change port in `python_backend/server.py`:
  ```python
  uvicorn.run("server:app", host="0.0.0.0", port=8001)
  ```
  And update `.env.local`:
  ```bash
  NEXT_PUBLIC_API_URL=http://localhost:8001
  ```

### Frontend issues
- **Connection refused**
  Make sure the Python backend is running

- **CORS errors**
  Check that your frontend URL is in the `allow_origins` list in `python_backend/server.py`

### Download issues
- **"Unable to extract"**
  Some sites require authentication or have region restrictions

- **Slow downloads**
  Check your internet connection. Some platforms rate-limit downloads.

- **Download fails**
  Try a different quality option. Not all qualities are available for all videos.

## Production Deployment

### Frontend (Next.js)
Deploy to Vercel, Netlify, or any Node.js hosting:
```bash
npm run build
npm start
```

### Backend (Python)
Deploy to any Python hosting (Heroku, Railway, DigitalOcean):

1. Update CORS settings in `server.py` to include your production frontend URL
2. Set up environment variables for API_URL
3. Use a production WSGI server:
   ```bash
   pip install gunicorn
   gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

**Security Notes for Production:**
- Add authentication (JWT, OAuth)
- Implement rate limiting
- Add request validation
- Use HTTPS
- Set up proper file cleanup
- Monitor disk usage

## File Structure

```
url-downloader/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FormatCard.tsx
│   └── UrlInput.tsx
├── lib/
│   └── platforms.ts
├── python_backend/
│   ├── downloads/           # Downloaded files
│   ├── downloader.py       # Core download logic
│   ├── server.py           # FastAPI server
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend docs
├── .env.local              # Environment variables
├── package.json
├── tailwind.config.ts
└── README.md              # This file
```

## Development

### Adding a new platform
yt-dlp supports it automatically if the site is in their [supported sites list](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md).

### Customizing the UI
Modify the design system values in:
- `app/globals.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration
- `app/page.tsx` - Main page layout

### Adding new download formats
Edit `python_backend/downloader.py` to add support for other formats (webm, m4a, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **yt-dlp** - [https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **Next.js** - [https://nextjs.org](https://nextjs.org)
- **FastAPI** - [https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **Tailwind CSS** - [https://tailwindcss.com](https://tailwindcss.com)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Note:** This tool is for personal use only. Please respect copyright laws and platform terms of service. Only download content you have permission to download.
