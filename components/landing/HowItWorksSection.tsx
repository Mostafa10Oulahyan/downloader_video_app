import { Link2, Search } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-slate-50/50 flex flex-col items-center justify-center text-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="space-y-4 mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            How it works
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Three simple steps. No account needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center -rotate-6 transition-transform hover:rotate-0 duration-300 shadow-xl shadow-blue-100">
                <Link2 size={40} className="text-blue-500" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-lg border-2 border-white text-sm">
                1
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900">Paste the link</h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium">
                Copy any YouTube or TikTok video URL and paste it in the search box.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-amber-100 rounded-3xl flex items-center justify-center rotate-6 transition-transform hover:rotate-0 duration-300 shadow-xl shadow-amber-100">
                <Search size={40} className="text-amber-500" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shadow-lg border-2 border-white text-sm">
                2
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900">Preview & choose</h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium">
                See the video details and select your preferred quality and format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
