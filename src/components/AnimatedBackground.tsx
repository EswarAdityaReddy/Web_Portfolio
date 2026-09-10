import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let animationFrame = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * window.devicePixelRatio;
      canvas.height = innerHeight * window.devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      if (particles.length === 0) {
        const count = Math.min(110, Math.max(60, Math.floor((innerWidth * innerHeight) / 22000)));
        for (let index = 0; index < count; index += 1) {
          particles.push({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: Math.random() * 1.8 + 0.6,
          });
        }
      }
    };

    const draw = () => {
      const { width, height } = canvas;
      const innerWidth = width / window.devicePixelRatio;
      const innerHeight = height / window.devicePixelRatio;

      context.clearRect(0, 0, innerWidth, innerHeight);
      const gradient = context.createRadialGradient(
        innerWidth / 2,
        innerHeight / 3,
        0,
        innerWidth / 2,
        innerHeight / 3,
        Math.max(innerWidth, innerHeight),
      );
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.09)');
      gradient.addColorStop(0.45, 'rgba(0, 163, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, innerWidth, innerHeight);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > innerHeight) particle.vy *= -1;

        context.beginPath();
        context.fillStyle = 'rgba(229, 249, 255, 0.85)';
        context.shadowColor = 'rgba(0, 255, 255, 0.75)';
        context.shadowBlur = 12;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        for (let offset = index + 1; offset < particles.length; offset += 1) {
          const other = particles[offset];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < 130) {
            context.beginPath();
            context.strokeStyle = `rgba(0, 255, 255, ${0.16 - distance / 800})`;
            context.lineWidth = 1;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#030712]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,163,255,0.10),transparent_26%)]" />
      <div className="scan-overlay absolute inset-x-0 top-0 h-40 animate-scan opacity-50" />
      <div className="absolute inset-0 opacity-10 noise" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_6px] animate-dataStream" />
    </div>
  );
}