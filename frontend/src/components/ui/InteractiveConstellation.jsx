import React, { useEffect, useRef } from "react";

/**
 * InteractiveConstellation:
 * High-performance, GPU-friendly 3D particle constellation canvas.
 * Renders floating 3D nodes with interactive cursor physics and ethereal filaments.
 * Pauses automatically when tab is hidden to ensure 0% idle CPU overhead.
 */
const InteractiveConstellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (normalized to canvas space)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    // Calculate particle count based on screen width (optimized for mobile/desktop)
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const fov = 400; // 3D Field of view

    // Particle constructor
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * fov,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.8,
        colorType: Math.random() > 0.3 ? "bronze" : "sapphire",
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);

    // Main 60fps render loop
    let isRunning = true;
    const render = () => {
      if (!isRunning) return;

      // Soft mouse interpolation for fluid momentum
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project and draw particles
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update 3D position
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around 3D boundary
        if (p.z <= 0) p.z = fov;
        if (p.z > fov) p.z = 1;
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;

        // 3D Perspective Projection
        const scale = fov / (fov + p.z);
        const projX = centerX + p.x * scale;
        const projY = centerY + p.y * scale;
        const projRadius = p.radius * scale;

        // Mouse displacement physics
        if (mouse.isHovered) {
          const dx = projX - mouse.x;
          const dy = projY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 2.5;
            p.y += (dy / dist) * force * 2.5;
          }
        }

        projected.push({
          x: projX,
          y: projY,
          radius: projRadius,
          scale,
          colorType: p.colorType,
        });

        // Draw particle node
        const alpha = Math.min(scale * 0.85, 0.9);
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(projRadius, 0.5), 0, Math.PI * 2);

        if (p.colorType === "bronze") {
          ctx.fillStyle = `rgba(192, 160, 98, ${alpha})`;
          ctx.shadowColor = "rgba(192, 160, 98, 0.5)";
        } else {
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.shadowColor = "rgba(96, 165, 250, 0.4)";
        }
        ctx.shadowBlur = scale > 0.8 ? 8 : 0;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw connective filaments between proximate nodes
      const maxDist = 120;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const filamentAlpha = (1 - dist / maxDist) * 0.18 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(192, 160, 98, ${filamentAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when tab is inactive to preserve CPU / battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-65"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
};

export default InteractiveConstellation;
