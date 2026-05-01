'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E6E8EA]">
      <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-[#F0B90B] flex items-center justify-center text-[#1E2026]">
            <Download size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[20px] tracking-tight text-[#1E2026]">MediaFlow</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-[#32313A]">
          <Link href="#features" className="hover:text-[#1A1A1A] transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-[#1A1A1A] transition-colors">How it works</Link>
          <Link href="#platforms" className="hover:text-[#1A1A1A] transition-colors">Platforms</Link>
        </div>
        <Button className="bg-[#F0B90B] hover:bg-[#D0980B] text-[#1E2026] rounded-[50px] px-8 py-2 font-semibold shadow-[0_2px_10px_-3px_rgb(153,153,153)] transition-all h-auto text-[16px]">
          Get Started
        </Button>
      </div>
    </nav>
  );
}