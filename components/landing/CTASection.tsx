'use client';

import { Download, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-28 px-6 mesh-cta overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-12 md:p-16 flex flex-col items-center gap-8 border-[var(--accent)]/10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center animate-float">
            <Download size={28} className="text-[var(--accent)]" />
          </div>

          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            Ready to download?
          </h2>

          <p className="text-[var(--text-secondary)] text-[clamp(1rem,1.5vw,1.15rem)] font-medium max-w-lg leading-relaxed">
            Start downloading your favorite YouTube and TikTok videos in seconds. No sign-up required. Completely free.
          </p>

          <a
            href="#hero"
            className="mt-2 inline-flex items-center gap-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-8 py-4 font-bold text-[16px] shadow-xl shadow-[var(--accent-glow)] transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer group animate-pulse-glow"
          >
            <Download size={18} />
            Start Downloading
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
