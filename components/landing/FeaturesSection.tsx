'use client';

import { Zap, Shield, MonitorPlay, Headphones, Globe, Lock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Edge-optimized infrastructure with globally distributed CDN for maximum bandwidth saturation.',
    accent: true,
  },
  {
    icon: MonitorPlay,
    title: '4K HDR Support',
    description: 'Download in up to 4K HDR at 60fps, preserving every detail of the original cinematic intent.',
  },
  {
    icon: Headphones,
    title: 'Audio Extraction',
    description: 'Extract pristine audio tracks in high-bitrate MP3. Perfect for podcasts and music.',
  },
  {
    icon: Shield,
    title: 'Total Reliability',
    description: 'Enterprise-grade infrastructure guarantees your downloads complete successfully, every single time.',
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'YouTube, TikTok, Instagram, Twitter/X, Facebook, Vimeo, and more — all in one place.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Zero data collection, no tracking, no accounts required. Your downloads stay private.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6 mesh-section overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[var(--glass-border)]" />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[13px] font-semibold text-[var(--text-secondary)] mb-4">
            <Zap size={14} className="text-[var(--accent)]" />
            Core Features
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            Everything you need.
            <br />
            <span className="text-[var(--text-secondary)]">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-[clamp(1rem,1.5vw,1.15rem)] max-w-2xl mx-auto font-medium leading-relaxed">
            Simple, fast, and reliable. Download your favorite videos without the hassle.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`glass-card rounded-2xl p-7 group cursor-default transition-all duration-300 hover:-translate-y-1 ${
                  feature.accent ? 'border-[var(--accent)]/20 bg-[var(--accent-soft)]' : ''
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                    feature.accent
                      ? 'bg-[var(--accent)]/20 group-hover:bg-[var(--accent)]/30'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-300 ${
                      feature.accent ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent)]'
                    }`}
                  />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-[18px] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-medium text-[14px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
