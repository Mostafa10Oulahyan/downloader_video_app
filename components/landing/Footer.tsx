import Link from 'next/link';
import { Download } from 'lucide-react';

const quickLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Platforms', href: '#platforms' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-[var(--glass-border)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-20 mb-16">
          {/* Brand */}
          <div className="flex-1 max-w-sm space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group cursor-pointer" aria-label="MediaFlow home">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white shadow-lg shadow-[var(--accent-glow)]">
                <Download size={18} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[20px] tracking-tight text-[var(--text-primary)]">
                Media<span className="text-gradient-accent">Flow</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] font-medium text-[14px] leading-relaxed">
              The simplest way to download YouTube and TikTok videos. Free, fast, and built with privacy in mind.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Mostafa10Oulahyan/downloader_video_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border-hover)] transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border-hover)] transition-all cursor-pointer"
                aria-label="X (Twitter)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="flex gap-16 lg:gap-24">
            <div className="space-y-5">
              <h4 className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[12px]">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[12px]">
                Legal
              </h4>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] font-medium text-[var(--text-muted)]">
          <p>&copy; {new Date().getFullYear()} MediaFlow. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <span className="inline-block w-3 h-3 rounded-full bg-[var(--accent)] animate-pulse" />
            by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
