'use client';

import { useState, useCallback } from 'react';
import { Search, ArrowRight, CheckCircle2, Loader2, Video, Music, Clock, Eye, Heart, ExternalLink, Download, AlertCircle, PlaySquare, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setVideoInfo(null);
    setDownloadTask(null);

    try {
      const detected = detectPlatform(url);
      setPlatform(detected);

      const response = await fetch(`${API_URL}/api/video-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const info: VideoInfo = await response.json();
      if (!response.ok) throw new Error(info.error || 'Failed to fetch video information');
      setVideoInfo(info);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error
        ? (err.message === 'Failed to fetch' ? 'Cannot connect to server. Please try again.' : err.message)
        : 'Something went wrong';
      setVideoInfo({ success: false, error: errorMessage });
    } finally {
      setIsAnalyzing(false);
    }
  }, [url]);

  const handleDownload = useCallback(async (format: 'mp4' | 'mp3', quality: string) => {
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
      setDownloadTask({ task_id: '', status: 'failed', progress: 0, error: err instanceof Error ? err.message : 'Unknown error' });
      setDownloadingFormat(null);
    }
  }, [url]);

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
            const link = document.createElement('a');
            link.href = `${API_URL}/api/file/${encodeURIComponent(task.filename)}`;
            link.download = task.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
    <section className="relative pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center bg-white min-h-[90vh]">
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center pt-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f5] text-[#1E2026] text-[14px] font-semibold mb-8 border border-[#E6E8EA]">
          <PlaySquare size={16} className="text-[#1E2026]" />
          <Smartphone size={16} className="text-[#1E2026]" />
          YouTube & TikTok Supported
        </div>
        
        <h1 className="text-[44px] md:text-[60px] font-bold tracking-tight text-[#1E2026] mb-6 w-full max-w-3xl leading-[1.08]">
          Download Videos <br />
          <span className="text-[#F0B90B]">In Seconds</span>
        </h1>
        
        <p className="text-[#848E9C] text-[18px] md:text-[20px] mb-12 max-w-2xl mx-auto font-medium leading-[1.5]">
          Paste a YouTube or TikTok link, preview it, and download in your preferred quality. Pure unadulterated pixels ready for the edit bay.
        </p>
        
        <div className="w-full max-w-2xl bg-white shadow-[0_3px_5px_rgba(32,32,37,0.05)] rounded-[50px] p-2 flex items-center border border-[#E6E8EA] focus-within:border-[#000000] focus-within:ring-1 focus-within:ring-[#000000] transition-all">
          <div className="pl-6 text-[#848E9C]">
            <Search size={22} strokeWidth={2.5} />
          </div>
          <Input 
            className="flex-1 border-0 shadow-none focus-visible:ring-0 text-[#1E2026] placeholder:text-[#848E9C] h-12 text-[16px] bg-transparent px-4 font-medium"
            placeholder="Paste media URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <Button 
            className="rounded-[50px] bg-[#F0B90B] hover:bg-[#D0980B] text-[#1E2026] px-8 h-12 font-bold shadow-[0_2px_10px_-3px_rgb(153,153,153)] flex items-center gap-2 transition-all disabled:opacity-50 text-[16px]"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url.trim()}
          >
            {isAnalyzing ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>Get Video <ArrowRight size={18} strokeWidth={2.5} /></>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 text-[14px] font-semibold text-[#848E9C] mb-8">
          <div className="flex items-center gap-2 py-2 px-4 rounded-[8px] bg-[#F5F5F5]">
            <CheckCircle2 size={18} className="text-[#0ECB81]" />
            No sign-up required
          </div>
          <div className="flex items-center gap-2 py-2 px-4 rounded-[8px] bg-[#F5F5F5]">
            <CheckCircle2 size={18} className="text-[#0ECB81]" />
            100% Free
          </div>
        </div>

        {/* Video Info Display */}
        {videoInfo?.success && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full text-left max-w-4xl mx-auto">
            <div className="bg-white rounded-[12px] border border-[#E6E8EA] shadow-[0_3px_5px_rgba(32,32,37,0.05)] overflow-hidden">
              <div className="relative aspect-video bg-[#F5F5F5]">
                {videoInfo.thumbnail && (
                  <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full h-full object-cover" />
                )}
                {platform && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-[8px] bg-[#222126]/90 backdrop-blur-sm shadow-sm">
                    <span className="text-[12px] font-bold text-white uppercase tracking-wider">{platform.name}</span>
                  </div>
                )}
                {videoInfo.duration && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-[8px] bg-[#222126]/90 backdrop-blur-sm">
                    <span className="text-[14px] font-bold text-white tracking-widest">{formatDuration(videoInfo.duration)}</span>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-[24px] font-bold text-[#1E2026] mb-2 leading-[1.00]">{videoInfo.title}</h2>
                <p className="text-[#848E9C] font-semibold text-[16px] mb-6">{videoInfo.uploader}</p>

                <div className="flex flex-wrap gap-6 mb-8 text-[14px] font-semibold">
                  {videoInfo.view_count && (
                    <span className="flex items-center gap-2 text-[#32313A]">
                      <Eye className="w-5 h-5 text-[#848E9C]" />
                      {formatNumber(videoInfo.view_count)} views
                    </span>
                  )}
                  {videoInfo.like_count && (
                    <span className="flex items-center gap-2 text-[#32313A]">
                      <Heart className="w-5 h-5 text-[#848E9C]" />
                      {formatNumber(videoInfo.like_count)}
                    </span>
                  )}
                  {videoInfo.webpage_url && (
                    <a href={videoInfo.webpage_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#F0B90B] hover:text-[#D0980B] transition-colors">
                      <ExternalLink className="w-5 h-5" />
                      Watch original
                    </a>
                  )}
                </div>

                <div className="flex gap-2 p-1.5 bg-[#F5F5F5] rounded-[12px] mb-8 max-w-sm">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`flex-1 py-3 rounded-[8px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'video' ? 'bg-white text-[#1E2026] shadow-sm border border-[#E6E8EA]' : 'text-[#848E9C] hover:text-[#32313A]'
                    }`}
                  >
                    <Video className="w-5 h-5" />
                    Video
                  </button>
                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`flex-1 py-3 rounded-[8px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'audio' ? 'bg-white text-[#1E2026] shadow-sm border border-[#E6E8EA]' : 'text-[#848E9C] hover:text-[#32313A]'
                    }`}
                  >
                    <Music className="w-5 h-5" />
                    Audio
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeTab === 'video' && videoInfo.available_qualities?.video.map((quality) => (
                    <DownloadButton key={quality} format="mp4" quality={quality} onDownload={handleDownload} isDownloading={downloadingFormat === `mp4-${quality}`} downloadTask={downloadTask} />
                  ))}
                  {activeTab === 'audio' && videoInfo.available_qualities?.audio.map((quality) => (
                    <DownloadButton key={quality} format="mp3" quality={quality} onDownload={handleDownload} isDownloading={downloadingFormat === `mp3-${quality}`} downloadTask={downloadTask} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {videoInfo && !videoInfo.success && (
          <div className="mt-8 max-w-xl mx-auto w-full">
            <div className="bg-white border border-[#F6465D] rounded-[12px] p-6 flex items-start gap-4 text-left shadow-sm">
              <AlertCircle className="w-6 h-6 text-[#F6465D] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#1E2026] text-[16px] mb-1">Download Error</h3>
                <p className="text-[#F6465D] font-medium text-[14px]">{videoInfo.error}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function DownloadButton({ format, quality, onDownload, isDownloading, downloadTask }: {
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
      className={`group bg-white hover:bg-[#F5F5F5] border border-[#E6E8EA] hover:border-[#F0B90B] rounded-[8px] p-4 transition-all duration-200 disabled:opacity-60 ${
        isDownloading ? 'border-[#F0B90B] ring-1 ring-[#F0B90B] bg-[#FFFdf2]' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-[6px] flex items-center justify-center bg-[#F5F5F5] group-hover:bg-white border border-[#E6E8EA]">
          <Download className="w-5 h-5 text-[#1E2026]" />
        </div>
        <div className="flex-1 text-left">
          <div className="font-bold text-[#1E2026] text-[16px] leading-[1.00] mb-2">{quality}</div>
          <div className="text-[12px] font-semibold text-[#848E9C] tracking-wide">{format.toUpperCase()}</div>
        </div>
        {isDownloading ? (
          downloadTask?.status === 'completed' ? (
            <CheckCircle2 className="w-6 h-6 text-[#0ECB81]" />
          ) : downloadTask?.status === 'failed' ? (
            <AlertCircle className="w-6 h-6 text-[#F6465D]" />
          ) : (
            <Loader2 className="w-6 h-6 text-[#F0B90B] animate-spin" />
          )
        ) : (
          <div />
        )}
      </div>
    </button>
  );
}
