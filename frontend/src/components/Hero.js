import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onBookAppointment }) => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1639421959302-0310b98285e0?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Corporate skyline"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-6">
              Strategic Excellence Since 2010
            </p>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.95]">
              Transform Your Business with
              <span className="block text-bronze-500">Strategic Insight</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 font-sans font-light mb-12 leading-relaxed max-w-2xl">
              We partner with industry leaders to unlock unprecedented growth through data-driven strategies and execution excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onBookAppointment}
                className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
                data-testid="hero-book-consultation-btn"
              >
                Book Consultation
                <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} />
              </Button>
              
              <Button
                onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-12 px-8 uppercase tracking-widest text-xs transition-colors duration-300"
                data-testid="hero-view-work-btn"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
