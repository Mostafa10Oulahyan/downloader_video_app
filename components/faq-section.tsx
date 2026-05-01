"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is this video downloader free to use?",
    answer: "Yes! We offer a free plan with 3 downloads per month. You can upgrade to our Pro plan for unlimited downloads, higher quality options, and priority support.",
  },
  {
    question: "Which platforms are supported?",
    answer: "We support 20+ platforms including YouTube, TikTok, Instagram, Facebook, Twitter, Reddit, Vimeo, SoundCloud, Tumblr, Pinterest, and many more. If a platform isn't supported, let us know!",
  },
  {
    question: "Do you store my downloaded videos?",
    answer: "No! We prioritize your privacy. Videos are downloaded directly to your device. We don't store, track, or save any of your content. Your data stays yours.",
  },
  {
    question: "Can I download videos in different qualities?",
    answer: "Absolutely! Choose from multiple quality options including 4K, 1080p, 720p, 480p, and even audio-only (MP3). The available qualities depend on the source video.",
  },
  {
    question: "Is there a download limit?",
    answer: "Free users can download 3 videos per month. Pro users enjoy unlimited downloads with no restrictions. The limit resets on the 1st of each month.",
  },
  {
    question: "How do I download audio only (MP3)?",
    answer: "Simply select the 'MP3 Audio' option when choosing your download format. We'll extract the audio track and provide a high-quality MP3 file.",
  },
  {
    question: "Are there any watermarks on downloaded videos?",
    answer: "No watermarks! Pro users get completely clean downloads without any branding or watermarks. Free users may see watermarks on some platforms.",
  },
  {
    question: "How fast is the download process?",
    answer: "Super fast! Most videos are processed in 1-3 seconds. Download speed depends on your internet connection and the video size. We use premium servers for optimal performance.",
  },
  {
    question: "Can I use this on mobile devices?",
    answer: "Yes! Our service works on all devices - desktop, mobile, and tablet. The interface is fully responsive and optimized for mobile browsing.",
  },
  {
    question: "What if a download fails?",
    answer: "If a download fails, check that the video URL is correct and the content is public. Some private or geo-restricted videos may not be downloadable. Contact support if issues persist.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-200 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-indigo-500/20">
            <HelpCircle className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about our video downloader
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-dark rounded-2xl border border-slate-700/50 overflow-hidden hover:border-indigo-500/50 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-6 w-6 text-indigo-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@videodownloader.pro"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Contact our support team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
