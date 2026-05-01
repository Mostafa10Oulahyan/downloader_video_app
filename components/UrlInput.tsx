'use client';

import { useState, useEffect, useCallback } from 'react';
import { detectPlatform, isValidUrl, type Platform } from '@/lib/platforms';
import {
  Link2,
  Clipboard,
  Loader2,
  Music,
  Video,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// Platform icons mapping
const PlatformIcons: Record<string, typeof Video> = {
  youtube: Video,
  soundcloud: Music,
  default: Video,
};

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function UrlInput({
  value,
  onChange,
  onAnalyze,
  isLoading = false,
  disabled = false,
}: UrlInputProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Detect platform when URL changes
  useEffect(() => {
    if (value.trim()) {
      const detected = detectPlatform(value);
      setPlatform(detected);
      setIsValid(isValidUrl(value));
    } else {
      setPlatform(null);
      setIsValid(null);
    }
  }, [value]);

  // Handle paste from clipboard
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text.trim());
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  }, [onChange]);

  // Handle keyboard shortcut
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading && isValid) {
        e.preventDefault();
        onAnalyze();
      }
    },
    [onAnalyze, isLoading, isValid]
  );

  // Get platform icon
  const PlatformIcon = platform
    ? PlatformIcons[platform.id] || PlatformIcons.default
    : Link2;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Input container with glow effect */}
      <div
        className={`
          relative rounded-2xl overflow-hidden
          transition-all duration-300 ease-out
          ${isFocused ? 'ring-4 ring-indigo-500/20' : ''}
          ${isValid === false ? 'ring-4 ring-red-500/20' : ''}
          ${isValid === true && platform ? 'ring-4 ring-green-500/10' : ''}
        `}
      >
        {/* Background glow */}
        <div
          className={`
            absolute inset-0 opacity-50 blur-xl transition-colors duration-300
            ${platform ? platform.bgColor : 'bg-indigo-500/10'}
          `}
        />

        {/* Input wrapper */}
        <div
          className={`
            relative flex items-center
            bg-slate-800/80 backdrop-blur-sm
            border-2 rounded-2xl
            transition-all duration-200
            ${isFocused ? 'border-indigo-500' : 'border-slate-700'}
            ${isValid === false ? 'border-red-500' : ''}
            ${isValid === true && platform ? 'border-green-500/50' : ''}
          `}
        >
          {/* Platform indicator */}
          <div
            className={`
              flex items-center justify-center
              w-14 h-14 ml-2
              rounded-xl
              transition-all duration-200
              ${platform ? platform.bgColor : 'bg-slate-700/50'}
            `}
          >
            <PlatformIcon
              className={`w-6 h-6 ${platform ? platform.color : 'text-slate-400'}`}
            />
          </div>

          {/* Input field */}
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            placeholder="Paste your video URL here..."
            className={`
              flex-1 h-16 px-4
              bg-transparent
              text-lg text-white
              placeholder-slate-500
              focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-label="Video URL input"
          />

          {/* Validation indicator */}
          {value && (
            <div className="flex items-center mr-2">
              {isValid === true && platform ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : isValid === false ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : null}
            </div>
          )}

          {/* Paste button */}
          <button
            type="button"
            onClick={handlePaste}
            disabled={disabled || isLoading}
            className={`
              flex items-center gap-2
              px-4 py-2 mr-2
              bg-indigo-600 hover:bg-indigo-500
              text-white text-sm font-medium
              rounded-xl
              transition-colors duration-200
              cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-label="Paste from clipboard"
          >
            <Clipboard className="w-4 h-4" />
            <span className="hidden sm:inline">Paste</span>
          </button>
        </div>
      </div>

      {/* Platform badge */}
      {platform && platform.id !== 'unknown' && (
        <div
          className={`
            inline-flex items-center gap-2
            mt-3 px-4 py-2
            rounded-full
            border
            text-sm font-medium
            animate-in fade-in slide-in-from-bottom-2 duration-300
            ${platform.bgColor}
            ${platform.borderColor}
            ${platform.color}
          `}
        >
          <PlatformIcon className="w-4 h-4" />
          <span>Detected: {platform.name}</span>
        </div>
      )}

      {/* Error message */}
      {isValid === false && value && (
        <p className="mt-2 text-sm text-red-400 animate-in fade-in duration-200">
          Please enter a valid URL
        </p>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 mt-3 text-indigo-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Analyzing URL...</span>
        </div>
      )}
    </div>
  );
}

export default UrlInput;
