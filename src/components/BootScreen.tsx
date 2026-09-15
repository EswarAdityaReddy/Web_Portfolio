import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import HolographicPanel from './HolographicPanel';
import { profile } from '../data/content';

interface BootScreenProps {
  onReady: () => void;
}

const ringConfig = [
  { label: 'AI', unlockAt: 1, radius: 72, delay: 0 },
  { label: 'ML', unlockAt: 2, radius: 92, delay: 0.05 },
  { label: 'Quantum', unlockAt: 2, radius: 112, delay: 0.1 },
  { label: 'Full Stack', unlockAt: 3, radius: 132, delay: 0.15 },
  { label: 'Research', unlockAt: 4, radius: 152, delay: 0.2 },
] as const;

const scanRows = [
  'NAME ........ SUNGALA ESWAR ADITYA REDDY',
  'ROLE ........ AI ENGINEER & SOFTWARE DEVELOPER',
  'STATUS ...... ONLINE',
  'UNIVERSITY .. SRM UNIVERSITY (CGPA 9.24)',
  'DUAL DEGREE . IIT MADRAS (BS DATA SCIENCE)',
  'SPECIALTY ... MACHINE LEARNING & AUTOMATION',
];

const stageScripts = [
  {
    title: 'J.A.R.V.I.S INITIALIZING',
    body: `Initializing ${profile.name} profile. Loading identity cache and Stark-grade control layers.`,
  },
  {
    title: 'SCANNING PROFILE',
    body: 'Cross-referencing achievements, technical domains, and mission signatures across SRM University and IIT Madras databases.',
  },
  {
    title: 'SCANNING PROFILE',
    body: 'Identity matrix confirmed. AI Engineer, Flutter Developer, ML Specialist. Rendering profile scan results below.',
  },
  {
    title: 'HUMAN IDENTIFICATION VERIFIED',
    body: 'All core domains synchronized. CGPA 9.24 confirmed. Security posture is stable.',
  },
  {
    title: 'WELCOME BACK, COMMANDER',
    body: 'Opening portfolio dashboard. All systems are operational, Commander Eswar.',
  },
] as const;

function useTypewriter(text: string, speed: number) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    setVisibleText('');

    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, text]);

  return visibleText;
}

export default function BootScreen({ onReady }: BootScreenProps) {
  const [stage, setStage] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [launching, setLaunching] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const sweepRef = useRef<HTMLDivElement | null>(null);
  const ringRefs = useRef<Array<SVGCircleElement | null>>([]);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 13 + 11) % 100}%`,
        top: `${(index * 17 + 19) % 100}%`,
        duration: 8 + (index % 5),
        delay: (index % 6) * 0.15,
      })),
    [],
  );

  const script = stageScripts[stage] ?? stageScripts[stageScripts.length - 1];
  const typedTitle = useTypewriter(script.title, stage >= 2 ? 52 : 58);
  const typedBody = useTypewriter(script.body, stage >= 2 ? 28 : 32);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 1200),
      window.setTimeout(() => setStage(2), 2200),
      window.setTimeout(() => setStage(3), 3800),
      window.setTimeout(() => setStage(4), 4800),
      window.setTimeout(() => setLaunching(true), 5600),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (stage !== 2) {
      setVisibleRows(stage > 2 ? scanRows.length : 0);
      return;
    }

    setVisibleRows(0);
    const interval = window.setInterval(() => {
      setVisibleRows((current) => Math.min(scanRows.length, current + 1));
    }, 320);

    return () => window.clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    const container = resultsRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [visibleRows]);

  useEffect(() => {
    ringConfig.forEach((ring, index) => {
      const circle = ringRefs.current[index];
      if (!circle) {
        return;
      }

      const circumference = 2 * Math.PI * ring.radius;
      gsap.to(circle, {
        strokeDashoffset: stage >= ring.unlockAt ? 0 : circumference,
        duration: 1.15,
        delay: ring.delay,
        ease: 'power2.out',
      });
    });
  }, [stage]);

  useEffect(() => {
    if (!launching) {
      return;
    }

    const timeline = gsap.timeline({
      onComplete: onReady,
    });

    timeline.to(coreRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 0.95,
      ease: 'power3.in',
    }, 0);

    timeline.to(sweepRef.current, {
      rotate: 420,
      scale: 1.7,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.inOut',
    }, 0);

    timeline.to(containerRef.current, {
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
    }, 0.35);

    timeline.to(flashRef.current, {
      opacity: 1,
      duration: 0.12,
      ease: 'power1.out',
    }, 0.2);

    timeline.to(flashRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power1.out',
    }, 0.38);
  }, [launching, onReady]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 overflow-hidden bg-[#030712] px-4 text-[#E5F9FF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.16),transparent_26%),radial-gradient(circle_at_bottom,rgba(0,163,255,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.92),rgba(3,7,18,0.78))]" />
      <div className="absolute inset-0 hud-grid opacity-20" />

      <div className="absolute inset-0 overflow-hidden opacity-70">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_18px_rgba(0,255,255,0.8)]"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              x: [0, 16, -8, 0],
              y: [0, -22, 14, 0],
              opacity: [0.15, 0.85, 0.2, 0.15],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,255,255,0.08)_50%,transparent_100%)] opacity-30" />
      <div className="pointer-events-none absolute inset-0 scan-lines opacity-25" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative mx-auto grid min-h-screen w-full max-w-7xl items-start gap-8 py-8 lg:items-start lg:grid-cols-[0.98fr_1.02fr]"
      >
        <div className="relative flex w-full flex-col items-center self-start pt-2">
          <div className="relative aspect-square w-full max-w-[380px] sm:max-w-[460px]">
            <div className="absolute inset-[10%] rounded-full border border-cyan/15 bg-cyan/5 blur-[1px]" />
            <motion.div
              ref={sweepRef}
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,rgba(0,255,255,0)_0deg,rgba(0,255,255,0.18)_40deg,rgba(0,255,255,0.95)_84deg,rgba(0,163,255,0.08)_130deg,rgba(0,255,255,0)_180deg)] opacity-55 blur-md"
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 14, ease: 'linear' }}
            />

            <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full -rotate-90">
              {ringConfig.map((ring, index) => {
                const circumference = 2 * Math.PI * ring.radius;
                return (
                  <circle
                    key={ring.label}
                    ref={(node) => {
                      ringRefs.current[index] = node;
                    }}
                    cx="210"
                    cy="210"
                    r={ring.radius}
                    fill="none"
                    stroke={index % 2 === 0 ? '#00FFFF' : '#00A3FF'}
                    strokeOpacity={index === 2 ? 0.65 : 0.45}
                    strokeWidth={index < 2 ? 7 : 8}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    style={{ filter: 'drop-shadow(0 0 14px rgba(0,255,255,0.75))' }}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                ref={coreRef}
                className="relative flex h-40 w-40 items-center justify-center rounded-full border border-cyan/30 bg-[radial-gradient(circle,rgba(0,255,255,0.38)_0%,rgba(0,163,255,0.18)_44%,rgba(3,7,18,1)_76%)] shadow-[0_0_42px_rgba(0,255,255,0.24),inset_0_0_34px_rgba(0,163,255,0.22)] sm:h-56 sm:w-56"
              >
                <div className="absolute inset-4 rounded-full border border-white/10" />
                <div className="absolute inset-9 rounded-full border border-cyan/10" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.22)_0%,transparent_64%)] blur-sm" />
                <div className="relative text-center">
                  <p className="text-[11px] uppercase tracking-[0.55em] text-cyan/75">Arc Reactor Core</p>
                  <p className="mt-4 text-3xl font-black uppercase tracking-[0.2em] text-white sm:text-4xl">JARVIS</p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.4em] text-blue/80">AI profile gateway</p>
                </div>
              </motion.div>
            </div>

            <div className="absolute inset-0 rounded-full border border-cyan/10 shadow-[0_0_90px_rgba(0,255,255,0.08)]" />
          </div>

          <div className="relative z-10 mt-4 grid w-full max-w-[460px] grid-cols-2 gap-3 px-2 sm:grid-cols-3 lg:max-w-[560px] lg:grid-cols-5">
            {ringConfig.map((ring) => (
              <div
                key={ring.label}
                className={`min-h-[62px] rounded-2xl border px-2.5 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur-xl transition ${
                  stage >= ring.unlockAt ? 'border-cyan/30 bg-cyan/10 text-cyan shadow-glow' : 'border-white/10 bg-black/30 text-slate-400'
                }`}
              >
                  <div className="flex items-center justify-center gap-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${stage >= ring.unlockAt ? 'bg-cyan' : 'bg-slate-500'}`} />
                  <span className="whitespace-nowrap">{ring.label}</span>
                </div>
                <p className="mt-2 text-[9px] tracking-[0.25em] text-white/70">
                  {stage >= ring.unlockAt ? 'UNLOCKED' : 'LOCKED'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <HolographicPanel className="relative self-start flex min-h-[560px] flex-col overflow-hidden p-0 lg:min-h-[590px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.16),transparent_36%)]" />
          <div className="relative shrink-0 border-b border-cyan/10 px-6 py-3 sm:px-8 sm:py-3.5">
            <p className="text-xs uppercase tracking-[0.55em] text-cyan/70">Boot Sequence</p>
            <div className="mt-2.5 min-h-[4.1rem] font-mono text-2xl font-semibold leading-tight text-white glow-text sm:min-h-[5rem] sm:text-4xl">
              <span>
                {typedTitle}
                <span className="console-caret" />
              </span>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col space-y-2.5 px-6 py-2.5 sm:px-8 sm:py-3">
            <p className="min-h-[72px] block max-w-2xl font-mono text-sm leading-7 text-mist/80 sm:min-h-[92px] sm:text-base">
              {typedBody}
              <span className="console-caret" />
            </p>

            <div className="relative flex h-[180px] min-h-[180px] flex-none overflow-hidden rounded-3xl border border-cyan/10 bg-black/35 p-4 sm:h-[202px] sm:min-h-[202px] sm:p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-70" />
              <div className="flex min-h-0 w-full flex-col">
                <p className="mb-2 text-[11px] uppercase tracking-[0.5em] text-cyan/70">Scan Results</p>
                <div ref={resultsRef} className="min-h-0 flex-1 overflow-hidden pr-1">
                  <div className="flex h-full flex-col justify-end space-y-2 overflow-hidden font-mono text-sm sm:text-base">
                    {scanRows.slice(0, visibleRows).map((row, index) => (
                      <motion.div
                        key={row}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <span className="w-28 text-cyan/80 sm:w-36">{row.split(' ........ ')[0]}</span>
                        <span className="text-cyan/35">........</span>
                        <span className="text-white">{row.split(' ........ ')[1]}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {[
                'Neon cyan intelligence grid active',
                'Holographic rings linking identity and skill domains',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-cyan/15 bg-white/5 px-4 py-2 text-sm text-mist/80 backdrop-blur-xl">
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-cyan/10 bg-black/30 px-5 py-2 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.55em] text-cyan/70">
                {stage < 3 ? 'IDENTITY MATRIX ACTIVE' : stage < 4 ? 'VERIFICATION SEQUENCE COMPLETE' : 'PORTAL READY'}
              </p>
              <p className="mt-1.5 text-base font-semibold text-white sm:text-lg">
                {stage >= 4 ? 'WELCOME BACK, COMMANDER' : stage === 3 ? 'HUMAN IDENTIFICATION VERIFIED' : 'Loading mission memory...'}
              </p>
            </div>
          </div>
        </HolographicPanel>
      </motion.div>

      <div ref={flashRef} className="pointer-events-none absolute inset-0 bg-cyan/18 opacity-0" />
    </div>
  );
}