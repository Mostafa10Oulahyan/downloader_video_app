'use client';

import { Zap, MonitorPlay, ShieldCheck, Wifi, HardDrive, Gauge } from 'lucide-react';

const stats = [
  { value: '10M+', label: 'Downloads' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4K', label: 'Max Quality' },
  { value: '<3s', label: 'Avg Speed' },
];

const qualityCards = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Globally distributed edge network ensures maximum bandwidth saturation for instant delivery.',
  },
  {
    icon: MonitorPlay,
    title: '4K HDR Support',
    description: 'Retain every detail. Download in up to 4K HDR at 60fps, preserving the original cinematic intent.',
  },
  {
    icon: ShieldCheck,
    title: 'Total Reliability',
    description: 'Enterprise-grade infrastructure guarantees your downloads complete successfully, every time.',
  },
  {
    icon: Wifi,
    title: 'Smart Resuming',
    description: 'Lost connection? Downloads auto-resume from where they stopped. Never lose progress again.',
  },
  {
    icon: HardDrive,
    title: 'Batch Downloads',
    description: 'Queue multiple videos and let MediaFlow handle the rest. Download playlists effortlessly.',
  },
  {
    icon: Gauge,
    title: 'Zero Throttling',
    description: 'No speed caps, no waiting queues. Full bandwidth utilization from start to finish.',
  },
];

export function PlatformsSection() {
  return (
    <section id="platforms" className="relative py-28 px-6 mesh-section overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            Engineered for
            <span className="text-gradient-accent"> Quality</span>.
          </h2>
          <p className="text-[var(--text-secondary)] text-[clamp(1rem,1.5vw,1.15rem)] font-medium max-w-2xl mx-auto">
            No compression. No watermarks. Just pure, unadulterated pixels ready for the edit bay.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
              <div className="text-[28px] font-extrabold text-[var(--accent)] mb-1">{stat.value}</div>
              <div className="text-[13px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quality cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {qualityCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-7 group cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-5 group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                  <Icon size={22} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-[18px] mb-2">
                  {card.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-medium text-[14px] leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}