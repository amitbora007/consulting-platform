import { ArrowRight, ShieldCheck, TrendingUp, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const Hero = ({ onBookAppointment }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:py-32 overflow-hidden">
      {/* Background with cinematic fade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1639421959302-0310b98285e0?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Corporate skyline"
          className="w-full h-full object-cover opacity-15 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/70 via-[#070A10]/90 to-[#070A10]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 my-auto">
        <div className="max-w-7xl mx-auto">
          {/* Asymmetric Tetris 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
            {/* 8-Column Editorial Core with Kinetic Typography */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-inner"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-400 animate-pulse"></span>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/80">
                  Quantitative Enterprise Strategy
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.95]"
              >
                Transform Your Enterprise with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bronze-300 via-bronze-400 to-amber-200 font-normal italic mt-2 drop-shadow-[0_0_35px_rgba(192,160,98,0.25)]">
                  Quantitative Precision.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl text-white/70 font-sans font-light mb-10 leading-relaxed max-w-2xl"
              >
                We partner with C-suite leaders and enterprise boards to unlock measurable valuation growth through data-driven strategy, operational turnarounds, and ruthless execution.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
              >
                <MagneticButton
                  onClick={onBookAppointment}
                  className="bg-white text-black hover:bg-gray-100 rounded-lg h-14 px-8 uppercase tracking-widest text-xs font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
                  data-testid="hero-book-consultation-btn"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} />
                </MagneticButton>

                <Button
                  onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white/[0.04] border border-white/20 text-white hover:bg-white/10 rounded-lg h-14 px-8 uppercase tracking-widest text-xs font-medium transition-all duration-300 backdrop-blur-md"
                  data-testid="hero-view-work-btn"
                >
                  View Case Studies
                </Button>
              </motion.div>
            </div>

            {/* 4-Column Executive Key Metrics Card with 3D Tilt & Continuous Floating Levitation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-4 perspective-1000 animate-float-slow"
            >
              <div className="relative group rounded-2xl overflow-hidden cursor-default transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(192,160,98,0.3)] border-beam-container">
                {/* 3D Glass Shell */}
                <div className="bg-[#0C1017]/90 border border-white/15 backdrop-blur-2xl p-8 rounded-2xl relative overflow-hidden transition-all duration-300 group-hover:border-bronze-500/50">
                  {/* Top Specular Rim */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                  {/* Ambient Light Cone */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-bronze-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-bronze-500/35 transition-all duration-500" />

                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bronze-400"></span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        Mandate Performance
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-4 h-4 text-bronze-400" strokeWidth={1.75} />
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div>
                      <div className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                        $14.8B+
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider text-white/50 mt-1">
                        Enterprise Capital Optimized
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="font-serif text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bronze-300 to-amber-200 tracking-tight drop-shadow-md">
                        34.2%
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider text-white/50 mt-1">
                        Average EBITDA Uplift
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                        98.4%
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider text-white/50 mt-1">
                        C-Suite Mandate Retention
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      Audited Analytics
                    </span>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-medium">
                        Live FY 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Institutional Trust Coordinates */}
          <div className="pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Headquarters
              </span>
              <span className="font-sans text-xs md:text-sm text-white/80 font-light">
                123 Executive Plaza, New York
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Global Network
              </span>
              <span className="font-sans text-xs md:text-sm text-white/80 font-light">
                London • Zurich • Singapore
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Practice Focus
              </span>
              <span className="font-sans text-xs md:text-sm text-white/80 font-light">
                Private Equity & Turnaround
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Engagement Model
              </span>
              <span className="font-sans text-xs md:text-sm text-white/80 font-light">
                Retainer & Performance Equity
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
