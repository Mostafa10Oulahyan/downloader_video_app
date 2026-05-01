import { MonitorPlay, Zap, ShieldCheck } from 'lucide-react';

export function PlatformsSection() {
  return (
    <section id="platforms" className="py-24 px-6 bg-[#222126] flex flex-col items-center justify-center text-center">
      <div className="max-w-[1200px] mx-auto space-y-4 mb-16 w-full relative">
        <h2 className="text-[34px] md:text-[48px] font-bold tracking-tight text-white leading-[1.00]">
          Engineered for Quality.
        </h2>
        <p className="text-[16px] md:text-[20px] text-[#848E9C] font-medium max-w-2xl mx-auto">
          No compression. No watermarks. Just pure, unadulterated pixels ready for the edit bay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full mb-24 max-w-[1200px] text-left">
        {/* Card 1 */}
        <div className="bg-[#2B2F36] p-8 rounded-[12px] border border-transparent hover:border-[#F0B90B] transition-colors shadow-[0_3px_5px_rgba(8,8,8,0.05)] cursor-default">
          <div className="w-12 h-12 rounded bg-[#F0B90B]/10 flex items-center justify-center mb-6">
            <Zap size={24} className="text-[#F0B90B]" />
          </div>
          <h3 className="font-bold text-white text-[24px] mb-3">Lightning Fast</h3>
          <p className="text-[#848E9C] font-medium text-[16px] leading-[1.5]">
            Our globally distributed edge network ensures maximum bandwidth saturation for instant delivery.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#2B2F36] p-8 rounded-[12px] border border-transparent hover:border-[#F0B90B] transition-colors shadow-[0_3px_5px_rgba(8,8,8,0.05)] cursor-default">
          <div className="w-12 h-12 rounded bg-[#F0B90B]/10 flex items-center justify-center mb-6">
            <MonitorPlay size={24} className="text-[#F0B90B]" />
          </div>
          <h3 className="font-bold text-white text-[24px] mb-3">4K Support</h3>
          <p className="text-[#848E9C] font-medium text-[16px] leading-[1.5]">
            Retain every detail. Download in up to 4K HDR at 60fps, preserving the original cinematic intent.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#2B2F36] p-8 rounded-[12px] border border-transparent hover:border-[#F0B90B] transition-colors shadow-[0_3px_5px_rgba(8,8,8,0.05)] cursor-default">
          <div className="w-12 h-12 rounded bg-[#F0B90B]/10 flex items-center justify-center mb-6">
            <ShieldCheck size={24} className="text-[#F0B90B]" />
          </div>
          <h3 className="font-bold text-white text-[24px] mb-3">Total Reliability</h3>
          <p className="text-[#848E9C] font-medium text-[16px] leading-[1.5]">
            Enterprise-grade infrastructure guarantees your downloads complete successfully, every time.
          </p>
        </div>
      </div>
    </section>
  );
}