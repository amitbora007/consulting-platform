import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * MetricCard3D:
 * High-end cinematic 3D tilt metric card featuring:
 * - Hardware-accelerated 3D perspective tilt
 * - Cursor-following specular spotlight
 * - Animated spring number transitions
 * - Multi-layer frosted glass pedestal with bronze rim lighting
 */
const MetricCard3D = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor = "bronze",
  index = 0,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 20,
    stiffness: 200,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setSpotlightPos({ x: currentX, y: currentY });

    const normX = (currentX / width) - 0.5;
    const normY = (currentY / height) - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group h-full rounded-xl overflow-hidden cursor-default transition-shadow duration-500"
      >
        {/* Smoked glass card shell with specular rim */}
        <div className="relative h-full bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:border-bronze-500/40 group-hover:shadow-[0_20px_40px_-15px_rgba(192,160,98,0.2)]">
          {/* Top specular highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Interactive cursor-tracking specular spotlight */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(192, 160, 98, 0.12), rgba(255, 255, 255, 0.04) 40%, transparent 80%)`,
            }}
          />

          {/* Ambient corner light cone */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-bronze-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-bronze-500/20 transition-all duration-500" />

          {/* Header Row: Label & 3D Elevated Pedestal Icon */}
          <div
            className="flex items-center justify-between mb-4 relative z-10"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-500/60 group-hover:bg-bronze-400 group-hover:scale-125 transition-all duration-300" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors duration-200">
                {title}
              </span>
            </div>

            {/* 3D Elevated Icon Pedestal */}
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 p-2 flex items-center justify-center shadow-lg group-hover:border-bronze-500/50 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(192,160,98,0.3)] transition-all duration-300">
              {Icon && (
                <Icon
                  className="w-4 h-4 text-bronze-400 group-hover:text-bronze-300 transition-colors duration-200"
                  strokeWidth={1.75}
                />
              )}
            </div>
          </div>

          {/* Metric Value Display with Animated Counter Transition */}
          <div
            className="my-2 relative z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex items-baseline gap-2">
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.8, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-bronze-200 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              >
                {value}
              </motion.div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400/80">
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle / Descriptive Label */}
          <div
            className="mt-2 pt-3 border-t border-white/[0.06] flex items-center justify-between relative z-10"
            style={{ transform: "translateZ(15px)" }}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 group-hover:text-white/60 transition-colors duration-200">
              {subtitle}
            </span>
            <span className="font-mono text-[10px] text-bronze-500/60 group-hover:text-bronze-400 group-hover:translate-x-0.5 transition-all duration-200">
              &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MetricCard3D;
