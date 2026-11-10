import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X, ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "services", label: "Expertise", num: "01" },
  { id: "testimonials", label: "Track Record", num: "02" },
  { id: "case-studies", label: "Case Studies", num: "03" },
  { id: "insights", label: "Perspectives", num: "04" },
];

const Navbar = ({ onBookAppointment }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05070D]/90 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-xl"
          : "bg-transparent border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Insignia / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-bronze-500/50 transition-colors duration-300 rounded-lg">
              <Building2 className="w-5 h-5 text-bronze-400" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white block leading-tight">
                CONSULT INC.
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">
                Executive Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible on lg+ screens to prevent 768px-1024px crowding) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/admin"
              className="font-mono text-xs uppercase tracking-widest text-bronze-400 hover:text-bronze-300 transition-colors duration-200 flex items-center gap-1 border-b border-bronze-500/30 pb-0.5"
            >
              Admin Portal
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={onBookAppointment}
              className="bg-white text-black hover:bg-gray-100 rounded-lg h-9 px-5 uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              data-testid="navbar-book-btn"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile & Tablet Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#070A10]/98 backdrop-blur-3xl shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-left hover:bg-white/5 transition-colors group border-b border-white/5"
                  >
                    <span className="font-serif text-lg text-white group-hover:text-bronze-300 transition-colors">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-white/40 tracking-wider">
                      {item.num}
                    </span>
                  </button>
                ))}

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-left hover:bg-white/5 transition-colors group border-b border-white/5"
                >
                  <span className="font-serif text-lg text-bronze-400 group-hover:text-bronze-300 transition-colors">
                    Admin Management
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-bronze-400" />
                </Link>
              </div>

              {/* Consultation CTA in Mobile Menu */}
              <div className="pt-2">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookAppointment();
                  }}
                  className="w-full bg-white text-black hover:bg-gray-100 rounded-xl h-12 uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                  data-testid="navbar-book-btn"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Book Consultation</span>
                </Button>
              </div>

              {/* Footer Coordinates */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                <span>NEW YORK • LONDON • ZURICH</span>
                <span>CONFIDENTIAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
