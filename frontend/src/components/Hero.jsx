import { ArrowRight, ShieldCheck, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onBookAppointment }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 md:py-32 overflow-hidden">
      {/* Background with cinematic fade */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1639421959302-0310b98285e0?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Corporate skyline"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/95 to-[#050505]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Asymmetric Tetris 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
            {/* 8-Column Editorial Core */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-8">
                <span className="w-1.5 h-1.5 bg-bronze-500 animate-pulse"></span>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70">
                  Strategic Excellence Since 2010
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.95]">
                Transform Your Enterprise with
                <span className="block text-bronze-500 font-normal italic mt-2">
                  Quantitative Precision.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/70 font-sans font-light mb-10 leading-relaxed max-w-2xl">
                We partner with C-suite leaders and enterprise boards to unlock measurable valuation growth through data-driven strategy, operational turnarounds, and ruthless execution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button
                  onClick={onBookAppointment}
                  className="bg-white text-black hover:bg-gray-200 rounded-none h-13 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)]"
                  data-testid="hero-book-consultation-btn"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} />
                </Button>

                <Button
                  onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-13 px-8 uppercase tracking-widest text-xs font-medium transition-colors duration-300"
                  data-testid="hero-view-work-btn"
                >
                  View Case Studies
                </Button>
              </div>
            </div>

            {/* 4-Column Executive Key Metrics Card with 3D Tilt */}
            <div className="lg:col-span-4 perspective-1000">
              <div className="relative group rounded-xl overflow-hidden cursor-default transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(192,160,98,0.25)]">
                {/* 3D Glass Shell */}
                <div className="bg-[#0C1017]/90 border border-white/15 backdrop-blur-2xl p-8 rounded-xl relative overflow-hidden transition-all duration-300 group-hover:border-bronze-500/50">
                  {/* Top Specular Rim */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  {/* Ambient Light Cone */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-bronze-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-bronze-500/30 transition-all duration-500" />

                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bronze-500"></span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        Mandate Performance
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 flex items-center justify-center">
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
                      <div className="font-serif text-3xl md:text-4xl font-bold text-bronze-400 tracking-tight drop-shadow-md">
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
            </div>
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
