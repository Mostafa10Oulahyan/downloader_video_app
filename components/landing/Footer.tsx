import Link from 'next/link';
import { Download } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-24">
        {/* Brand */}
        <div className="flex-1 space-y-6 max-w-sm">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white shadow-sm">
              <Download size={18} strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">MediaFlow</span>
          </Link>
          <p className="text-slate-500 font-medium leading-relaxed">
            The simplest way to download YouTube and TikTok videos. Free, fast, and easy to use.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-24">
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-slate-500 font-medium">
              <li><Link href="#features" className="hover:text-[#00A3FF] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-[#00A3FF] transition-colors">How it works</Link></li>
              <li><Link href="#platforms" className="hover:text-[#00A3FF] transition-colors">Platforms</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="flex flex-col gap-4 text-slate-500 font-medium">
              <li><Link href="#" className="hover:text-[#00A3FF] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#00A3FF] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-400">
        <p>© 2026 MediaFlow. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> for everyone
        </p>
      </div>
    </footer>
  );
}
