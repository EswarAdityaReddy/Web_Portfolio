import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 229, 255, 0.06), transparent 40%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300" />;
}
