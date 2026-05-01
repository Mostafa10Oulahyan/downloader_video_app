'use client';

import { Link2, Search, Download } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    step: '01',
    title: 'Paste the link',
    description: 'Copy any YouTube or TikTok video URL and paste it in the search box above.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Preview & choose',
    description: 'See the video details, thumbnail, and select your preferred quality and format.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download instantly',
    description: 'Hit download and your file is ready in seconds. No waiting, no limits.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-[var(--text-primary)]">
            How it works
          </h2>
          <p className="text-[var(--text-secondary)] text-[clamp(1rem,1.5vw,1.15rem)] font-medium">
            Three simple steps. No account needed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-[var(--accent)]/30 via-[var(--glass-border)] to-[var(--accent)]/30" />

          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="flex flex-col items-center text-center group"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Icon circle */}
                <div className="relative mb-8">
                  <div className="w-[80px] h-[80px] rounded-2xl glass-card flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent)]/30 group-hover:shadow-lg group-hover:shadow-[var(--accent-glow)]">
                    <Icon size={32} className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center shadow-lg shadow-[var(--accent-glow)] text-[12px]">
                    {i + 1}
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <h3 className="text-[20px] font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] max-w-xs mx-auto font-medium text-[14px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
