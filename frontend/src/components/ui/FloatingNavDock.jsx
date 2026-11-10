import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";

const chapters = [
  { id: "hero", label: "Vision", num: "01" },
  { id: "services", label: "Practices", num: "02" },
  { id: "testimonials", label: "Perspectives", num: "03" },
  { id: "case-studies", label: "Dossiers", num: "04" },
  { id: "insights", label: "Briefings", num: "05" },
];

/**
 * FloatingNavDock:
 * Architectural floating executive command dock.
 * - Hidden on mobile viewports (< 768px) to prevent screen obstruction and touch collision
 * - Auto-reveals only after scrolling past the Hero fold (scrollY > 220px)
 * - Highlights current chapter with scroll-spy
 * - Provides quick access to consultation booking
 */
const FloatingNavDock = ({ onBookAppointment }) => {
  const [activeChapter, setActiveChapter] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only reveal dock after scrolling past initial hero fold
      const shouldShow = window.scrollY > 220;
      setIsVisible(shouldShow);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const section = document.getElementById(chapters[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPos >= top) {
            setActiveChapter(chapters[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto items-center"
        >
          <div className="bg-[#070A10]/92 backdrop-blur-2xl border border-white/12 px-2.5 py-1.5 rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)] flex items-center gap-1.5 relative">
            {/* Top specular highlight rim */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            {/* Chapter Links */}
            <div className="flex items-center gap-1">
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToChapter(ch.id)}
                    className={`relative px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDockChapter"
                        className="absolute inset-0 bg-white/[0.09] border border-white/15 rounded-lg shadow-inner"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive ? "text-bronze-400 font-bold" : "opacity-45"
                      }`}
                    >
                      {ch.num}
                    </span>
                    <span className="relative z-10">{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="w-[1px] h-4 bg-white/15 mx-1" />

            {/* Consultation Action Button */}
            <button
              onClick={onBookAppointment}
              className="bg-white hover:bg-gray-100 text-[#06080E] font-sans font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-200 flex items-center gap-1.5 group flex-shrink-0"
              title="Book Executive Consultation"
            >
              <Calendar className="w-3.5 h-3.5 text-[#06080E]" strokeWidth={2} />
              <span>Book Briefing</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavDock;
