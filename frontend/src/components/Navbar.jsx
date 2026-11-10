import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = ({ onBookAppointment }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent border-b border-white/5 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Insignia / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-bronze-500/50 transition-colors duration-300">
              <Building2 className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white block leading-tight">
                CONSULT INC.
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">
                Executive Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Track Record
            </button>
            <button
              onClick={() => scrollToSection("case-studies")}
              className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollToSection("insights")}
              className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Perspectives
            </button>
            <Link
              to="/admin"
              className="font-mono text-xs uppercase tracking-widest text-bronze-500/80 hover:text-bronze-500 transition-colors duration-300 flex items-center gap-1 border-b border-bronze-500/30 pb-0.5"
            >
              Admin Portal
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={onBookAppointment}
              className="bg-white text-black hover:bg-gray-200 rounded-none h-10 px-6 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
              data-testid="navbar-book-btn"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-6 pb-6 border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-2xl -mx-6 px-6 space-y-5 animate-in fade-in duration-200">
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left font-mono text-xs uppercase tracking-widest text-white/80 py-2 border-b border-white/5"
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left font-mono text-xs uppercase tracking-widest text-white/80 py-2 border-b border-white/5"
            >
              Track Record
            </button>
            <button
              onClick={() => scrollToSection("case-studies")}
              className="block w-full text-left font-mono text-xs uppercase tracking-widest text-white/80 py-2 border-b border-white/5"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollToSection("insights")}
              className="block w-full text-left font-mono text-xs uppercase tracking-widest text-white/80 py-2 border-b border-white/5"
            >
              Perspectives
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-bronze-500 py-2 flex items-center justify-between border-b border-white/5"
            >
              <span>Admin Management Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookAppointment();
              }}
              className="w-full bg-white text-black hover:bg-gray-200 rounded-none h-12 uppercase tracking-widest text-xs font-bold transition-colors duration-300 mt-2"
            >
              Book Consultation
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
