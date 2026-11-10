import { Target, TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";

const services = [
  {
    index: "01",
    icon: Target,
    title: "Strategic Advisory & Planning",
    tagline: "Corporate Architecture & Long-Range Roadmaps",
    description: "Multi-year capital allocation, competitive positioning, and M&A integration roadmaps engineered for defensible enterprise valuation.",
    deliverables: ["Board-level strategy dossiers", "Market dislocation analysis", "Capital allocation frameworks"],
  },
  {
    index: "02",
    icon: TrendingUp,
    title: "Quantitative Growth Optimization",
    tagline: "Margin Maximization & Revenue Engine Design",
    description: "Deep mathematical modeling and unit economic optimization across sales cycles, pricing architecture, and customer lifetime value.",
    deliverables: ["Pricing elasticity audits", "Sales velocity playbooks", "Unit margin expansion"],
  },
  {
    index: "03",
    icon: Users,
    title: "Executive & Board Governance",
    tagline: "C-Suite Alignment & Succession Planning",
    description: "Confidential advisory for executive leadership teams navigating high-stakes transitions, activist investor engagements, and structural reorganizations.",
    deliverables: ["C-suite succession mapping", "Incentive compensation alignment", "Activist defense posture"],
  },
  {
    index: "04",
    icon: Zap,
    title: "Operational & Digital Transformation",
    tagline: "Process Modernization & Enterprise Tech Stack",
    description: "Eliminating operational bottlenecks and modernizing core enterprise systems to reduce operational expenditures and eliminate legacy debt.",
    deliverables: ["Legacy stack modernization", "Automated workflow governance", "CapEx efficiency audits"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-bronze-500"></span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                Institutional Capabilities
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Practices Engineered for Results.
            </h2>
          </div>
          <p className="font-sans font-light text-white/60 max-w-md text-sm md:text-base leading-relaxed">
            Every mandate is governed by strict quantitative thresholds. We do not deliver theoretical decks; we execute measurable financial outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-bronze-500/40 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(192,160,98,0.25)]"
                data-testid={`service-card-${index}`}
              >
                {/* Top specular highlight rim */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                {/* Subtle ambient light blur */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-bronze-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-bronze-500/20 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    {/* 3D Elevated Icon Pedestal */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:border-bronze-500/50 group-hover:shadow-[0_0_20px_rgba(192,160,98,0.3)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-bronze-400 group-hover:text-bronze-300 transition-colors duration-200" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/30 group-hover:text-bronze-400 transition-colors duration-300">
                      {service.index} // PRACTICE
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="font-mono text-xs uppercase tracking-wider text-bronze-400/90 mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-white/60 font-sans font-light leading-relaxed text-sm md:text-base mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2.5 relative z-10">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                    Core Deliverables
                  </span>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-sans text-white/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400 flex-shrink-0" strokeWidth={1.75} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
