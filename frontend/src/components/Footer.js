import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = ({ onBookAppointment }) => {
  return (
    <footer className="border-t border-white/10 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-bronze-500" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl font-bold text-white">
                Consult Inc.
              </h3>
            </div>
            <p className="text-white/60 font-sans font-light leading-relaxed mb-8">
              Transforming businesses through strategic excellence and innovative solutions since 2010.
            </p>
            <Button
              onClick={onBookAppointment}
              className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
              data-testid="footer-book-btn"
            >
              Get Started
            </Button>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/60 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {["Strategic Planning", "Growth Optimization", "Leadership Development", "Digital Transformation"].map((service) => (
                <li key={service}>
                  <a href="#" className="text-white/80 hover:text-white font-sans transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/60 mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:contact@consultinc.com" className="text-white/80 hover:text-white font-sans transition-colors duration-300">
                  contact@consultinc.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+15550001234" className="text-white/80 hover:text-white font-sans transition-colors duration-300">
                  +1 (555) 000-1234
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-white/80 font-sans">
                  123 Executive Plaza<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/40">
            © 2026 Consult Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-xs text-white/40 hover:text-white/60 transition-colors duration-300"
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
