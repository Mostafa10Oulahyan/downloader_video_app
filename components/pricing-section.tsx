"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for casual users",
    icon: Zap,
    features: [
      "3 downloads per month",
      "MP3 & MP4 formats",
      "720p max quality",
      "Standard support",
      "Ads supported",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Unlimited power for creators",
    icon: Crown,
    features: [
      "Unlimited downloads",
      "All formats (MP3, MP4, WEBM)",
      "4K Ultra HD quality",
      "Priority 24/7 support",
      "No ads ever",
      "Batch downloads",
      "Download history",
      "Early access to new features",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-200 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Start for free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {plan.highlighted && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-xl shadow-indigo-500/50 flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full flex flex-col glass-dark rounded-3xl shadow-2xl transition-all duration-300 border-2 ${
                    plan.highlighted
                      ? "border-indigo-500/50 shadow-indigo-500/50 md:scale-110 md:z-10"
                      : "border-slate-700/50 hover:border-indigo-500/30"
                  }`}
                >
                  <CardHeader className="text-center pb-8 pt-12 px-8">
                    <div className={`mx-auto mb-6 p-4 rounded-2xl w-fit ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-indigo-500/30 to-purple-500/30"
                        : "bg-slate-800/50"
                    }`}>
                      <Icon className={`h-12 w-12 ${
                        plan.highlighted ? "text-indigo-400" : "text-slate-400"
                      }`} />
                    </div>
                    <CardTitle className="text-3xl font-bold mb-3 text-white">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-300 mb-6">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-6">
                      <span className={`text-6xl font-black ${
                        plan.highlighted
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
                          : "text-white"
                      }`}>
                        {plan.price}
                      </span>
                      <span className="text-slate-400 ml-3 text-lg">
                        / {plan.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow px-8 pb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`mt-0.5 rounded-full p-1 ${
                            plan.highlighted
                              ? "bg-indigo-500/20"
                              : "bg-slate-700/50"
                          }`}>
                            <Check className={`h-5 w-5 ${
                              plan.highlighted ? "text-indigo-400" : "text-slate-400"
                            }`} />
                          </div>
                          <span className="text-base text-slate-200 leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-6 pb-8 px-8">
                    <Button
                      size="lg"
                      className={`w-full text-lg font-bold h-14 transition-all duration-300 ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-2xl shadow-indigo-500/50 pulse-glow"
                          : "bg-slate-800 border-2 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-700 text-white"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-3xl mx-auto border border-slate-700/50">
            <p className="text-slate-300 leading-relaxed text-lg">
              <span className="font-semibold text-white">💳 Secure payments powered by PayPal.</span>
              <br />
              All plans include access to our platform. Cancel anytime, no questions asked.
              <br />
              <span className="text-indigo-300">Join 50,000+ happy users worldwide!</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
