'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PlatformsSection,
  CTASection,
  Footer,
} from '@/components/landing';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PlatformsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
