/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#030712',
        cyan: '#00FFFF',
        blue: '#00A3FF',
        electric: '#00E5FF',
        mist: '#E5F9FF',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 255, 0.35), 0 0 40px rgba(0, 163, 255, 0.2)',
        'glow-lg': '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 163, 255, 0.3)',
        'glow-electric': '0 0 20px rgba(0, 229, 255, 0.4), 0 0 40px rgba(0, 229, 255, 0.2)',
        panel: '0 12px 50px rgba(0, 0, 0, 0.35)',
        'panel-lg': '0 20px 70px rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.06)', opacity: '0.55' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        dataStream: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 6s ease-in-out infinite',
        scan: 'scan 4s linear infinite',
        drift: 'drift 7s ease-in-out infinite',
        spinSlow: 'spinSlow 24s linear infinite',
        dataStream: 'dataStream 10s linear infinite',
        float: 'float 6s ease-in-out infinite',
        glitch: 'glitch 0.3s ease-in-out',
        radarSweep: 'radarSweep 8s linear infinite',
        circuitPulse: 'circuitPulse 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Segoe UI', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};