'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Platforms', href: '#platforms' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="MediaFlow home">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white shadow-lg shadow-[var(--accent-glow)] transition-transform duration-200 group-hover:scale-105">
            <Download size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[20px] tracking-tight text-[var(--text-primary)]">
            Media<span className="text-gradient-accent">Flow</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="#hero"
          className="hidden md:flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-6 py-2.5 font-semibold text-[14px] shadow-lg shadow-[var(--accent-glow)] transition-all duration-200 hover:shadow-xl hover:shadow-[var(--accent-glow)] cursor-pointer"
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={20} className="text-[var(--text-primary)]" />
          ) : (
            <Menu size={20} className="text-[var(--text-primary)]" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-[var(--glass-border)] px-6 py-6 animate-slide-up-sm space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[16px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-6 py-3 font-semibold text-[14px] shadow-lg shadow-[var(--accent-glow)] transition-all cursor-pointer mt-4"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}