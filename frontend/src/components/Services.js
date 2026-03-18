import { Target, TrendingUp, Users, Zap } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Long-term roadmaps aligned with your vision and market dynamics.",
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization",
    description: "Data-driven approaches to accelerate revenue and market share.",
  },
  {
    icon: Users,
    title: "Leadership Development",
    description: "Executive coaching and organizational transformation programs.",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Technology integration and process modernization initiatives.",
  },
];

const Services = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
            Our Expertise
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Services That Drive Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 glow"
                data-testid={`service-card-${index}`}
              >
                <Icon className="w-10 h-10 text-bronze-500 mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-white/60 font-sans font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
