import { motion } from 'framer-motion';

export default function RadarScanner() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center overflow-hidden rounded-full border border-cyan/20 bg-black/25 shadow-glow">
      <div className="absolute inset-6 rounded-full border border-cyan/15" />
      <div className="absolute inset-14 rounded-full border border-blue/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,255,255,0.15),transparent_58%)]" />
      <div className="absolute inset-0 rounded-full border border-cyan/10" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        className="absolute inset-3 rounded-full bg-[conic-gradient(from_90deg,rgba(0,255,255,0)_0deg,rgba(0,255,255,0.0)_180deg,rgba(0,255,255,0.9)_210deg,rgba(0,255,255,0)_270deg)] opacity-80 blur-[1px]"
      />
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute inset-[18%] rounded-full border border-cyan/20"
      />
      <div className="absolute inset-[26%] rounded-full border border-cyan/20 bg-[#05111f]/75 backdrop-blur-xl" />
      <div className="relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan/65">Radar Scanner</p>
        <p className="mt-2 text-3xl font-semibold text-white glow-text">Active</p>
      </div>
    </div>
  );
}