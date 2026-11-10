import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Compass, ArrowUpRight } from "lucide-react";

const chapters = [
  { id: "hero", label: "Vision", num: "01" },
  { id: "services", label: "Practices", num: "02" },
  { id: "testimonials", label: "Perspectives", num: "03" },
  { id: "case-studies", label: "Dossiers", num: "04" },
  { id: "insights", label: "Briefings", num: "05" },
];

/**
 * FloatingNavDock:
 * Cinematic floating executive navigation dock.
 * Tracks active chapter with scroll-spy, provides smooth gliding,
 * and maintains continuous access to confidential appointment bookings.
 */
const FloatingNavDock = ({ onBookAppointment }) => {
  const [activeChapter, setActiveChapter] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-full px-4"
        >
          <div className="bg-[#090D14]/85 backdrop-blur-2xl border border-white/15 px-3 py-2 rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-2 relative">
            {/* Specular highlight rim */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {/* Chapter Pills (Desktop / Tablet) */}
            <div className="hidden md:flex items-center gap-1">
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToChapter(ch.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#06080E] font-bold"
                        : "text-white/65 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeChapterPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#DFC285] via-[#D4B26F] to-[#C0A062] rounded-full shadow-[0_0_22px_rgba(192,160,98,0.55)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-[#06080E] font-bold opacity-80" : "opacity-60"}`}>
                      {ch.num}
                    </span>
                    <span className={`relative z-10 ${isActive ? "text-[#06080E] font-bold" : ""}`}>
                      {ch.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Active Chapter Indicator */}
            <div className="flex md:hidden items-center gap-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400 animate-pulse" />
              <span>
                {chapters.find((c) => c.id === activeChapter)?.num} //{" "}
                {chapters.find((c) => c.id === activeChapter)?.label}
              </span>
            </div>

            <div className="w-[1px] h-5 bg-white/15 mx-1" />

            {/* Consultation Action Button */}
            <button
              onClick={onBookAppointment}
              className="bg-white text-black hover:bg-gray-100 font-sans font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-200 flex items-center gap-1.5 group flex-shrink-0"
              title="Book Executive Consultation"
            >
              <Calendar className="w-3.5 h-3.5 text-black" strokeWidth={2} />
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
