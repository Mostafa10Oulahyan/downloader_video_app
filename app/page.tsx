'use client';

import {
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PlatformsSection,
  CTASection,
  Footer,
} from '@/components/landing';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
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
