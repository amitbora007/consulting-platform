import { Building2, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = ({ onBookAppointment }) => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Purpose */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  CONSULT INC.
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">
                  C-Suite Advisory & Turnaround Practice
                </span>
              </div>
            </div>

            <p className="text-white/60 font-sans font-light leading-relaxed mb-8 max-w-sm text-sm">
              Partnering with enterprise boards and executives to engineer quantitative margin expansion, capital efficiency, and strategic dominance since 2010.
            </p>

            <Button
              onClick={onBookAppointment}
              className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
              data-testid="footer-book-btn"
            >
              Initiate Discussion
            </Button>
          </div>

          {/* Practice Areas */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Practices
            </h4>
            <ul className="space-y-3 font-sans text-sm font-light">
              {[
                "Corporate Architecture & Strategy",
                "EBITDA & Margin Optimization",
                "Executive & Board Governance",
                "Cross-Border M&A Integration",
                "Enterprise Restructuring",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-0.5"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Operations */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Global Coordination
            </h4>
            <ul className="space-y-4 font-sans text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-white/80">
                  <strong className="font-medium text-white block">New York (Headquarters)</strong>
                  123 Executive Plaza, 44th Floor<br />
                  New York, NY 10001
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-white/80">
                  <strong className="font-medium text-white block">Regional Offices</strong>
                  London • Zurich • Singapore
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:contact@consultinc.com"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  partners@consultinc.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="tel:+15550001234"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  +1 (212) 555-0120
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Provenance */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/40">
            © 2026 Consult Inc. All rights reserved. Confidential client communications.
          </p>
          <div className="flex gap-6">
            {["Confidentiality Charter", "Terms of Engagement", "Regulatory Disclosures"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
