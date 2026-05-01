import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] p-16 md:p-24 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none" />
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 relative z-10 w-full max-w-2xl text-center">
          Ready to download?
        </h2>
        
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto relative z-10 text-center">
          Start downloading your favorite YouTube and TikTok videos in seconds. No sign-up required.
        </p>

        <Button className="mt-4 bg-[#00A3FF] hover:bg-[#0092E5] text-white rounded-full px-8 py-7 font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all hover:-translate-y-1 hover:shadow-xl text-lg relative z-10">
          <Download size={20} className="group-hover:animate-bounce" />
          Start Downloading
        </Button>
      </div>
    </section>
  );
}
