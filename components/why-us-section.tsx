"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Heart, Users, Globe, Lock } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download videos in seconds with our optimized infrastructure. No waiting, no delays.",
  },
  {
    icon: Shield,
    title: "100% Safe & Secure",
    description: "Your privacy matters. We don't store your videos or personal data. Everything is encrypted.",
  },
  {
    icon: Globe,
    title: "20+ Platforms Supported",
    description: "YouTube, TikTok, Instagram, Twitter, Reddit, and many more. One tool for everything.",
  },
  {
    icon: Heart,
    title: "No Watermarks",
    description: "Download clean videos without watermarks or branding. Get the original quality.",
  },
  {
    icon: Users,
    title: "Trusted by 50,000+",
    description: "Join thousands of satisfied users who download millions of videos every month.",
  },
  {
    icon: Lock,
    title: "Ad-Free Experience",
    description: "Premium users enjoy an ad-free, seamless downloading experience. No interruptions.",
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="w-full py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Why Choose Us?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're not just another video downloader. We're the fastest, safest, and most reliable solution trusted by thousands worldwide.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-dark p-8 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all border border-slate-700/50 hover:border-indigo-500/50 group"
              >
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {reason.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
