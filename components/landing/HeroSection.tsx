'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Video,
  Music,
  Eye,
  Heart,
  ExternalLink,
  Download,
  AlertCircle,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';
import { detectPlatform, type Platform } from '@/lib/platforms';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://downloader-video-script.onrender.com';

interface VideoInfo {
  success: boolean;
  title?: string;
  description?: string;
  uploader?: string;
  duration?: number;
  view_count?: number;
  like_count?: number;
  thumbnail?: string;
  webpage_url?: string;
  available_qualities?: {
    video: string[];
    audio: string[];
  };
  error?: string;
}

interface DownloadTask {
  task_id: string;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  progress: number;
  filename?: string;
  file_size?: number;
  title?: string;
  error?: string;
}

export function HeroSection() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadTask, setDownloadTask] = useState<DownloadTask | null>(null);
  const [serverReady, setServerReady] = useState(false);

  // Wake up Render server on page load (free tier sleeps after 15min)
  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then(() => setServerReady(true))
      .catch(() => {
        // Retry once after 3s
        setTimeout(() => {
          fetch(`${API_URL}/api/health`)
            .then(() => setServerReady(true))
            .catch(() => setServerReady(false));
        }, 3000);
      });
  }, []);

  // Fetch with timeout + retry for Render cold starts
  const fetchWithRetry = useCallback(
    async (url: string, options: RequestInit, maxRetries = 2): Promise<Response> => {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout
          const response = await fetch(url, { ...options, signal: controller.signal });
          clearTimeout(timeoutId);
          return response;
        } catch (err) {
          if (attempt === maxRetries) throw err;
          // Wait before retry (2s, 4s)
          await new Promise((r) => setTimeout(r, (attempt + 1) * 2000));
        }
      }
      throw new Error('Failed to fetch');
    },
    [],
  );

  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setVideoInfo(null);
    setDownloadTask(null);

    try {
      const detected = detectPlatform(url);
      setPlatform(detected);

      const response = await fetchWithRetry(`${API_URL}/api/video-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const info: VideoInfo = await response.json();
      if (!response.ok) throw new Error(info.error || 'Failed to fetch video information');
      setVideoInfo(info);
    } catch (err) {
      console.error('Analysis error:', err);
      let errorMessage = 'Something went wrong';
      if (err instanceof Error) {
        if (err.name === 'AbortError' || err.message === 'Failed to fetch') {
          errorMessage =
            'Server is starting up (free tier). Please wait 30 seconds and try again.';
        } else {
          errorMessage = err.message;
        }
      }
      setVideoInfo({ success: false, error: errorMessage });
    } finally {
      setIsAnalyzing(false);
    }
  }, [url, fetchWithRetry]);

  const handleDownload = useCallback(
    async (format: 'mp4' | 'mp3', quality: string) => {
      if (!url.trim()) return;
      setDownloadingFormat(`${format}-${quality}`);
      setDownloadTask({ task_id: '', status: 'pending', progress: 0 });

      try {
        const response = await fetch(`${API_URL}/api/download`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, format, quality: quality.replace(/\D/g, '') }),
        });

        if (!response.ok) throw new Error('Failed to start download');
        const task: { task_id: string } = await response.json();
        pollDownloadStatus(task.task_id);
      } catch (err) {
        console.error('Download error:', err);
        setDownloadTask({
          task_id: '',
          status: 'failed',
          progress: 0,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
        setDownloadingFormat(null);
      }
    },
    [url],
  );

  const pollDownloadStatus = useCallback((taskId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/download/${taskId}`);
        if (!response.ok) throw new Error('Failed to check status');

        const task: DownloadTask = await response.json();
        setDownloadTask(task);

        if (task.status === 'completed' || task.status === 'failed') {
          clearInterval(interval);
          setDownloadingFormat(null);
          if (task.status === 'completed' && task.filename) {
            // Use fetch + blob for cross-origin download (Render → browser)
            try {
              const fileResponse = await fetch(
                `${API_URL}/api/file/${encodeURIComponent(task.filename)}`
              );
              if (!fileResponse.ok) throw new Error('File download failed');
              const blob = await fileResponse.blob();
              const blobUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = task.filename;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(blobUrl);
            } catch (fileErr) {
              console.error('File download error:', fileErr);
              // Fallback: open in new tab
              window.open(
                `${API_URL}/api/file/${encodeURIComponent(task.filename)}`,
                '_blank'
              );
            }
          }
        }
      } catch (err) {
        console.error('Status check error:', err);
        clearInterval(interval);
        setDownloadingFormat(null);
      }
    }, 2000);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 mesh-hero overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[var(--bg-tertiary)] opacity-[0.15] blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[var(--text-secondary)] text-[13px] font-semibold mb-10">
          <Sparkles size={14} className="text-[var(--accent)]" />
          YouTube & TikTok — Instant Downloads
        </div>

        {/* Heading */}
        <h1 className="animate-slide-up delay-100 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight leading-[1.05] mb-6 max-w-4xl">
          Download Any Video
          <br />
          <span className="text-gradient-hero">In Seconds</span>
        </h1>

        {/* Subheading */}
        <p className="animate-slide-up delay-200 text-[var(--text-secondary)] text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          Paste a YouTube or TikTok link, preview it, and download in your preferred quality.
          Pure unadulterated pixels ready for the edit bay.
        </p>

        {/* Search Input */}
        <div className="animate-slide-up delay-300 w-full max-w-2xl">
          <div className="glass-input rounded-2xl p-2 flex items-center gap-2 transition-all">
            <div className="pl-4 text-[var(--text-muted)]">
              <Search size={20} strokeWidth={2} />
            </div>
            <input
              className="flex-1 bg-transparent border-0 outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] h-12 text-[16px] font-medium px-2"
              placeholder="Paste video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              aria-label="Video URL input"
            />
            <button
              className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-7 h-12 font-bold shadow-lg shadow-[var(--accent-glow)] flex items-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-[15px] cursor-pointer whitespace-nowrap"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !url.trim()}
            >
              {isAnalyzing ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Get Video <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="animate-slide-up delay-400 flex flex-wrap items-center justify-center gap-4 mt-10">
          {[
            { icon: Shield, text: 'No sign-up required' },
            { icon: Zap, text: '100% Free' },
            { icon: CheckCircle2, text: '4K Support' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-[13px] font-semibold text-[var(--text-secondary)]"
            >
              <Icon size={14} className="text-[var(--success)]" />
              {text}
            </div>
          ))}
        </div>

        {/* Video Info Display */}
        {videoInfo?.success && (
          <div className="mt-12 animate-slide-up w-full text-left max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-[var(--bg-secondary)]">
                {videoInfo.thumbnail && (
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title || 'Video thumbnail'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {platform && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg glass">
                    <span className="text-[12px] font-bold text-white uppercase tracking-wider">
                      {platform.name}
                    </span>
                  </div>
                )}
                {videoInfo.duration && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg glass">
                    <span className="text-[14px] font-bold text-white tracking-widest font-mono">
                      {formatDuration(videoInfo.duration)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <h2 className="text-[22px] font-bold text-[var(--text-primary)] mb-2 leading-tight line-clamp-2">
                  {videoInfo.title}
                </h2>
                <p className="text-[var(--text-secondary)] font-semibold text-[15px] mb-6">
                  {videoInfo.uploader}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-5 mb-8 text-[14px] font-semibold">
                  {videoInfo.view_count != null && (
                    <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Eye className="w-4 h-4 text-[var(--text-muted)]" />
                      {formatNumber(videoInfo.view_count)} views
                    </span>
                  )}
                  {videoInfo.like_count != null && (
                    <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Heart className="w-4 h-4 text-[var(--text-muted)]" />
                      {formatNumber(videoInfo.like_count)}
                    </span>
                  )}
                  {videoInfo.webpage_url && (
                    <a
                      href={videoInfo.webpage_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Watch original
                    </a>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 glass rounded-xl mb-8 max-w-xs" role="tablist">
                  <button
                    onClick={() => setActiveTab('video')}
                    role="tab"
                    aria-selected={activeTab === 'video'}
                    className={`flex-1 py-2.5 rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      activeTab === 'video'
                        ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </button>
                  <button
                    onClick={() => setActiveTab('audio')}
                    role="tab"
                    aria-selected={activeTab === 'audio'}
                    className={`flex-1 py-2.5 rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      activeTab === 'audio'
                        ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Music className="w-4 h-4" />
                    Audio
                  </button>
                </div>

                {/* Download buttons */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeTab === 'video' &&
                    videoInfo.available_qualities?.video.map((quality) => (
                      <DownloadButton
                        key={quality}
                        format="mp4"
                        quality={quality}
                        onDownload={handleDownload}
                        isDownloading={downloadingFormat === `mp4-${quality}`}
                        downloadTask={downloadTask}
                      />
                    ))}
                  {activeTab === 'audio' &&
                    videoInfo.available_qualities?.audio.map((quality) => (
                      <DownloadButton
                        key={quality}
                        format="mp3"
                        quality={quality}
                        onDownload={handleDownload}
                        isDownloading={downloadingFormat === `mp3-${quality}`}
                        downloadTask={downloadTask}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {videoInfo && !videoInfo.success && (
          <div className="mt-10 max-w-xl mx-auto w-full animate-slide-up-sm">
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4 text-left border-[var(--error)]/30">
              <div className="w-10 h-10 rounded-lg bg-[var(--error-soft)] flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-[var(--error)]" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] text-[16px] mb-1">Download Error</h3>
                <p className="text-[var(--error)] font-medium text-[14px]">{videoInfo.error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DownloadButton({
  format,
  quality,
  onDownload,
  isDownloading,
  downloadTask,
}: {
  format: 'mp4' | 'mp3';
  quality: string;
  onDownload: (format: 'mp4' | 'mp3', quality: string) => void;
  isDownloading: boolean;
  downloadTask: DownloadTask | null;
}) {
  return (
    <button
      onClick={() => onDownload(format, quality)}
      disabled={isDownloading}
      className={`group glass-card rounded-xl p-4 transition-all duration-200 disabled:opacity-50 cursor-pointer hover:border-[var(--accent)]/40 ${
        isDownloading ? 'border-[var(--accent)]/40 shadow-lg shadow-[var(--accent-glow)]' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
          <Download className="w-5 h-5 text-[var(--accent)]" />
        </div>
        <div className="flex-1 text-left">
          <div className="font-bold text-[var(--text-primary)] text-[15px] leading-tight mb-1">{quality}</div>
          <div className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            {format.toUpperCase()}
          </div>
        </div>
        {isDownloading ? (
          downloadTask?.status === 'completed' ? (
            <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
          ) : downloadTask?.status === 'failed' ? (
            <AlertCircle className="w-5 h-5 text-[var(--error)]" />
          ) : (
            <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
          )
        ) : (
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {/* Progress bar */}
      {isDownloading && downloadTask && downloadTask.progress > 0 && (
        <div className="mt-3 w-full h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${downloadTask.progress}%` }}
          />
        </div>
      )}
    </button>
  );
}
