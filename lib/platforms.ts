/**
 * Platform Detection Utilities
 * Simplified version for the URL Downloader
 */

export interface Platform {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const PLATFORMS: { [key: string]: Platform } = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    color: 'text-red-500',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    color: 'text-pink-400',
    bgColor: 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20',
    borderColor: 'border-pink-500/30',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    color: 'text-purple-400',
    bgColor: 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20',
    borderColor: 'border-purple-500/30',
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter/X',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
    borderColor: 'border-blue-400/30',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    color: 'text-blue-500',
    bgColor: 'bg-blue-600/20',
    borderColor: 'border-blue-600/30',
  },
  vimeo: {
    id: 'vimeo',
    name: 'Vimeo',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
  },
  soundcloud: {
    id: 'soundcloud',
    name: 'SoundCloud',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
  },
  twitch: {
    id: 'twitch',
    name: 'Twitch',
    color: 'text-purple-500',
    bgColor: 'bg-purple-600/20',
    borderColor: 'border-purple-600/30',
  },
  reddit: {
    id: 'reddit',
    name: 'Reddit',
    color: 'text-orange-600',
    bgColor: 'bg-orange-600/20',
    borderColor: 'border-orange-600/30',
  },
};

/**
 * Detect platform from URL
 */
export function detectPlatform(url: string): Platform | null {
  if (!url) return null;

  const urlLower = url.toLowerCase();

  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return PLATFORMS.youtube;
  }
  if (urlLower.includes('tiktok.com')) {
    return PLATFORMS.tiktok;
  }
  if (urlLower.includes('instagram.com')) {
    return PLATFORMS.instagram;
  }
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    return PLATFORMS.twitter;
  }
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) {
    return PLATFORMS.facebook;
  }
  if (urlLower.includes('vimeo.com')) {
    return PLATFORMS.vimeo;
  }
  if (urlLower.includes('soundcloud.com')) {
    return PLATFORMS.soundcloud;
  }
  if (urlLower.includes('twitch.tv')) {
    return PLATFORMS.twitch;
  }
  if (urlLower.includes('reddit.com') || urlLower.includes('redd.it')) {
    return PLATFORMS.reddit;
  }

  // Unknown platform
  return {
    id: 'unknown',
    name: 'Unknown Platform',
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/20',
    borderColor: 'border-slate-500/30',
  };
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
