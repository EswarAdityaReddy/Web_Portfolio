import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  Briefcase,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Filter,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  Menu,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import BootScreen from './components/BootScreen';
import MouseSpotlight from './components/MouseSpotlight';
import TypingRoles from './components/TypingRoles';
import AnimatedCounter from './components/AnimatedCounter';
import {
  achievements,
  assistantQuickActions,
  assistantResponses,
  certifications,
  education,
  experiences,
  profile,
  projectFilters,
  projects,
  skills,
  type Project,
} from './data/content';

/* ─── Section IDs ─────────────────────────────────────────────────────────── */

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/* ─── Hooks ───────────────────────────────────────────────────────────────── */

type StatsState = {
  github: {
    followers: number;
    repos: number;
    stars: number;
    following: number;
    name: string;
    bio: string;
  };
  leetcode: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: string;
  };
};

type ConsoleLine = {
  type: 'system' | 'user' | 'assistant';
  text: string;
};

const defaultStats: StatsState = {
  github: {
    followers: 0,
    repos: 0,
    stars: 0,
    following: 0,
    name: profile.name,
    bio: 'Connect your GitHub username to stream live profile telemetry.',
  },
  leetcode: {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: 'Sync pending',
  },
};

function useStats() {
  const [stats, setStats] = useState<StatsState>(defaultStats);

  useEffect(() => {
    const githubUsername = profile.githubUsername;
    const leetcodeUsername = profile.leetcodeUsername;

    const loadGithub = async () => {
      if (!githubUsername || githubUsername.includes('your-github')) return;
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`),
        ]);
        if (!profileResponse.ok || !reposResponse.ok) return;
        const profileData = await profileResponse.json();
        const repoData = await reposResponse.json();
        const stars = Array.isArray(repoData)
          ? repoData.reduce((sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count ?? 0), 0)
          : 0;
        setStats((current) => ({
          ...current,
          github: {
            followers: profileData.followers ?? current.github.followers,
            repos: profileData.public_repos ?? current.github.repos,
            stars,
            following: profileData.following ?? current.github.following,
            name: profileData.name ?? githubUsername,
            bio: profileData.bio ?? current.github.bio,
          },
        }));
      } catch {
        // Fallback state stays visible
      }
    };

    const loadLeetCode = async () => {
      if (!leetcodeUsername || leetcodeUsername.includes('your-leetcode')) return;
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
        if (!response.ok) return;
        const data = await response.json();
        setStats((current) => ({
          ...current,
          leetcode: {
            totalSolved: data.totalSolved ?? current.leetcode.totalSolved,
            easySolved: data.easySolved ?? current.leetcode.easySolved,
            mediumSolved: data.mediumSolved ?? current.leetcode.mediumSolved,
            hardSolved: data.hardSolved ?? current.leetcode.hardSolved,
            ranking: data.ranking ? `Top ${data.ranking}` : current.leetcode.ranking,
          },
        }));
      } catch {
        // Fallback state stays visible
      }
    };

    void loadGithub();
    void loadLeetCode();
  }, []);

  return stats;
}

/* ─── Particle Field ──────────────────────────────────────────────────────── */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const particles = Array.from({ length: 72 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0009,
      vy: (Math.random() - 0.5) * 0.0009,
      radius: Math.random() * 1.8 + 0.6,
    }));

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = 'rgba(0, 255, 255, 0.85)';
      context.shadowColor = 'rgba(0, 255, 255, 0.6)';
      context.shadowBlur = 10;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
        const x = particle.x * window.innerWidth;
        const y = particle.y * window.innerHeight;
        context.beginPath();
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />;
}

/* ─── Radar Scanner ───────────────────────────────────────────────────────── */

function RadarScanner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-70">
      <div className="relative h-[280px] w-[280px] rounded-full border border-cyan/20 sm:h-[360px] sm:w-[360px]">
        <div className="absolute inset-2 rounded-full border border-cyan/15" />
        <div className="absolute inset-8 rounded-full border border-cyan/20" />
        <div className="absolute inset-16 rounded-full border border-cyan/15" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.08)_0%,transparent_65%)]" />
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan/60 to-transparent" />
        <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-blue/70 to-transparent" />
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,255,255,0.0),rgba(0,255,255,0.75),rgba(0,255,255,0.0))] opacity-30 blur-sm animate-spinSlow" />
      </div>
    </div>
  );
}

/* ─── Skill Ring ──────────────────────────────────────────────────────────── */

function SkillRing({ name, level }: { name: string; level: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className="holo-panel holo-border neon-hover group relative overflow-hidden p-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center gap-3">
        <svg viewBox="0 0 96 96" className="h-20 w-20 shrink-0 -rotate-90">
          <circle cx="48" cy="48" r={radius} className="fill-none stroke-white/10" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="fill-none stroke-cyan/90"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="min-w-0">
          <div className="text-base font-semibold text-white truncate">{name}</div>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan">{level}%</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Project Card ────────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.01 }}
      className="holo-panel holo-border card-3d group relative overflow-hidden p-5"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.14),transparent_35%)]" />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan/80">{project.category}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
          </div>
          <BadgeCheck className="h-5 w-5 text-cyan" />
        </div>
        <p className="text-sm leading-6 text-slate-300">{project.summary}</p>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <ul className="space-y-1">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan/70" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full border border-cyan/15 bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-mist/90">
              {item}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="text-sm text-cyan/90">{project.impact}</p>
          <div className="flex items-center gap-3">
            <a href={project.link ?? '#'} className="inline-flex items-center gap-2 text-sm text-white transition hover:text-cyan btn-magnetic">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={project.link ?? '#'} className="inline-flex items-center gap-2 text-sm text-white transition hover:text-cyan btn-magnetic">
              <ExternalLink className="h-4 w-4" /> Demo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── AI Assistant Panel ──────────────────────────────────────────────────── */

function AssistantPanel() {
  const [command, setCommand] = useState('help');
  const [lines, setLines] = useState<ConsoleLine[]>([
    { type: 'system', text: 'Welcome Commander. Initializing Portfolio... System Ready.' },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (input: string) => {
    const clean = input.trim().toLowerCase();
    if (!clean) return;

    setLines((current) => [
      ...current,
      { type: 'user', text: `> ${clean}` },
      {
        type: 'assistant',
        text:
          clean === 'clear'
            ? assistantResponses.clear
            : assistantResponses[clean] ?? assistantResponses.help,
      },
    ]);

    if (clean === 'clear') {
      setLines([{ type: 'system', text: 'Welcome Commander. Initializing Portfolio... System Ready.' }]);
    }
  };

  return (
    <div className="holo-panel holo-border relative overflow-hidden p-5">
      <div className="absolute inset-0 data-stream opacity-30" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan/80">AI Assistant</p>
            <h3 className="mt-2 text-2xl font-semibold text-white flex items-center gap-2">
              <Bot className="h-6 w-6 text-cyan" /> JARVIS Interface
            </h3>
          </div>
          <div className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan">
            Active
          </div>
        </div>

        <div className="terminal-grid rounded-2xl border border-cyan/10 bg-slate-950/60 p-4">
          <div ref={scrollRef} className="max-h-64 space-y-3 overflow-y-auto pr-2 font-mono text-sm text-mist/90">
            {lines.map((line, index) => (
              <p key={`${line.text}-${index}`} className={line.type === 'assistant' ? 'text-cyan' : line.type === 'user' ? 'text-white' : 'text-blue/80'}>
                {line.text}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {assistantQuickActions.map((item) => (
            <button
              key={item.command}
              type="button"
              onClick={() => runCommand(item.command)}
              className="rounded-full border border-cyan/20 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-mist transition hover:border-cyan/50 hover:bg-cyan/10 btn-magnetic"
            >
              {item.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(command);
            if (command.trim().toLowerCase() !== 'clear') {
              setCommand('');
            }
          }}
          className="flex items-center gap-3 rounded-2xl border border-cyan/15 bg-black/30 px-4 py-3"
        >
          <Terminal className="h-4 w-4 text-cyan" />
          <input
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="Type a command, then press Enter"
          />
          <button type="submit" className="inline-flex items-center gap-2 text-sm text-cyan transition hover:text-white">
            Send <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Contact Terminal ────────────────────────────────────────────────────── */

function ContactTerminal() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission placeholder
    alert(`Message transmitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="holo-panel-strong terminal-grid relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-0 scan-lines opacity-25" />
      <div className="relative grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan/80">Holographic Communication Panel</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Transmit Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-cyan/70 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl border border-cyan/15 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan/50 focus:shadow-glow"
                placeholder="Enter your name, Commander"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-cyan/70 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-2xl border border-cyan/15 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan/50 focus:shadow-glow"
                placeholder="your.email@domain.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-cyan/70 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full rounded-2xl border border-cyan/15 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan/50 focus:shadow-glow resize-none"
                placeholder="Type your message..."
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] btn-magnetic"
            >
              <Send className="h-4 w-4" /> Transmit Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-cyan/15 bg-slate-950/70 p-5 shadow-glow space-y-4">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan">
              <Terminal className="h-4 w-4" />
              Contact Channels
            </div>

            <div className="space-y-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-2xl border border-cyan/15 bg-black/30 p-4 transition hover:border-cyan/40 hover:bg-cyan/5 neon-hover">
                <Mail className="h-5 w-5 text-cyan" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan/70">Email</p>
                  <p className="text-sm text-white">{profile.email}</p>
                </div>
              </a>

              <a href={`tel:+91${profile.phone}`} className="flex items-center gap-3 rounded-2xl border border-cyan/15 bg-black/30 p-4 transition hover:border-cyan/40 hover:bg-cyan/5 neon-hover">
                <Phone className="h-5 w-5 text-cyan" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan/70">Phone</p>
                  <p className="text-sm text-white">+91 {profile.phone}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic"
            >
              <Linkedin className="h-4 w-4" /> Connect LinkedIn
            </a>
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic"
            >
              <Github className="h-4 w-4" /> Open GitHub
            </a>
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HoloSection Wrapper ─────────────────────────────────────────────────── */

function HoloSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.55em] text-cyan/80">{eyebrow}</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl glow-text">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
      </div>
      {children}
    </motion.section>
  );
}

/* ─── Grouped Skills by Category ──────────────────────────────────────────── */

const skillCategories = ['Programming', 'Databases', 'AI/ML', 'Automation'];

const categoryIcons: Record<string, React.ReactNode> = {
  Programming: <Code2 className="h-5 w-5 text-cyan" />,
  Databases: <Cpu className="h-5 w-5 text-cyan" />,
  'AI/ML': <Sparkles className="h-5 w-5 text-cyan" />,
  Automation: <Zap className="h-5 w-5 text-cyan" />,
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN APP                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const stats = useStats();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navFlash, setNavFlash] = useState(false);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    setNavFlash(true);
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => setNavFlash(false), 400);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!bootComplete) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [bootComplete]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const categoryMatch = activeFilter === 'All' || project.category === activeFilter;
        const searchMatch = [project.name, project.summary, ...project.tech].some((entry) =>
          entry.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        return categoryMatch && searchMatch;
      }),
    [activeFilter, searchTerm],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-[#E5F9FF]">
      <ParticleField />
      <MouseSpotlight />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-transparent" />

      {/* Navigation flash overlay */}
      <AnimatePresence>
        {navFlash && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(0,255,255,0.08) 0%, rgba(0,255,255,0.03) 50%, transparent 80%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── Navigation ─────────────────────────────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'border-b border-cyan/10 bg-[#030712]/85 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="inline-flex items-center gap-3 rounded-full border border-cyan/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:border-cyan/30 hover:bg-white/8">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_20px_rgba(0,255,255,0.9)]" />
            <span className="font-display tracking-[0.28em] text-xs uppercase">JARVIS</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-cyan/10 bg-white/5 px-2 py-1.5 text-[11px] uppercase tracking-[0.22em] text-slate-300 backdrop-blur-xl xl:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToSection(item.id)}
                className="rounded-full px-3 py-2 transition hover:bg-cyan/10 hover:text-cyan cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan transition hover:border-cyan/60 hover:bg-cyan/20 btn-magnetic"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-cyan/15 bg-white/5 p-2 text-cyan xl:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-cyan/10 bg-[#030712]/95 backdrop-blur-xl xl:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setMobileMenuOpen(false); navigateToSection(item.id); }}
                    className="rounded-xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-slate-300 transition hover:bg-cyan/10 hover:text-cyan text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ─── Hero Section ───────────────────────────────────────────────── */}
        <section id="home" className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_35%)]" />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <p className="text-lg text-slate-400 sm:text-xl">Hello, I am</p>
                    <h1 className="mt-2 max-w-4xl font-display text-4xl font-black uppercase tracking-[0.08em] text-white sm:text-5xl lg:text-6xl">
                      Sungala Eswar{' '}
                      <span className="text-cyan glow-text-strong">Aditya Reddy</span>
                    </h1>
                  </div>
                  <div className="text-xl sm:text-2xl">
                    <TypingRoles className="text-xl sm:text-2xl" />
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{profile.intro}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#about" className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] btn-magnetic">
                    Initialize Portfolio <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic">
                    View Projects <Code2 className="h-4 w-4" />
                  </a>
                  <a href={profile.resumeHref} download className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic">
                    Download Resume <Download className="h-4 w-4" />
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic">
                    Contact AI <Bot className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'CGPA', value: '9.11' },
                    { label: 'Hackathons', value: '2' },
                    { label: 'Certifications', value: '6' },
                  ].map((item) => (
                    <div key={item.label} className="holo-panel holo-border p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan/70">{item.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── JARVIS Arc Reactor AI Core ─── */}
              <div className="relative flex items-center justify-center">
                <RadarScanner />
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex h-[380px] w-[380px] items-center justify-center sm:h-[500px] sm:w-[500px]"
                >
                  {/* Ring 1 — outermost, slow spin, dashed */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '1.5px dashed rgba(0,255,255,0.25)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Ring 2 — dotted, reverse spin */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: '14px', border: '1px dotted rgba(0,163,255,0.3)' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Ring 3 — solid thin, medium speed */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: '30px', border: '1px solid rgba(0,255,255,0.15)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* Orbiting data nodes on Ring 3 */}
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <motion.div
                        key={deg}
                        className="absolute h-2 w-2 rounded-full bg-cyan/80"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${deg}deg) translateX(calc(50% + 100px)) translateY(-50%)`,
                          boxShadow: '0 0 8px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.4)',
                        }}
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: deg / 360 * 2 }}
                      />
                    ))}
                  </motion.div>

                  {/* Ring 4 — dashed, reverse */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: '50px', border: '1px dashed rgba(0,229,255,0.2)' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* Orbiting data nodes on Ring 4 */}
                    {[0, 90, 180, 270].map((deg) => (
                      <motion.div
                        key={deg}
                        className="absolute h-1.5 w-1.5 rounded-full bg-blue/70"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${deg}deg) translateX(calc(50% + 70px)) translateY(-50%)`,
                          boxShadow: '0 0 6px rgba(0,163,255,0.7)',
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: deg / 360 * 1.5 }}
                      />
                    ))}
                  </motion.div>

                  {/* Ring 5 — solid, fast spin */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: '68px', border: '1px solid rgba(0,255,255,0.12)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Ring 6 — innermost orbit ring */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: '82px', border: '1px dotted rgba(0,255,255,0.18)' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Conic gradient sweep */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: '20px',
                      background: 'conic-gradient(from 0deg, rgba(0,255,255,0.2), transparent 30%, transparent 70%, rgba(0,163,255,0.15), transparent)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Energy beams — cross pattern */}
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    animate={{ opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan/50 to-transparent" />
                    <div className="absolute top-1/2 left-[15%] right-[15%] h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
                    <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-blue/30 to-transparent" style={{ transform: 'rotate(45deg)' }} />
                    <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-blue/30 to-transparent" style={{ transform: 'rotate(-45deg)' }} />
                  </motion.div>

                  {/* ─── Central Core ─── */}
                  <div className="relative z-20 flex items-center justify-center">
                    {/* Core outer glow ring */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: '180px', height: '180px' }}
                      animate={{
                        boxShadow: [
                          '0 0 20px 6px rgba(0,255,255,0.25), inset 0 0 20px 6px rgba(0,255,255,0.15)',
                          '0 0 50px 15px rgba(0,255,255,0.5), inset 0 0 40px 10px rgba(0,255,255,0.3)',
                          '0 0 20px 6px rgba(0,255,255,0.25), inset 0 0 20px 6px rgba(0,255,255,0.15)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-cyan/40" />
                    </motion.div>

                    {/* Core inner glow */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,163,255,0.1) 40%, transparent 70%)',
                      }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Core spinning arc */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: '160px',
                        height: '160px',
                        background: 'conic-gradient(from 0deg, rgba(0,255,255,0.5), transparent 40%, transparent 60%, rgba(0,229,255,0.4), transparent)',
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Inner border ring */}
                    <motion.div
                      className="absolute rounded-full border border-cyan/30"
                      style={{ width: '120px', height: '120px' }}
                      animate={{
                        borderColor: ['rgba(0,255,255,0.3)', 'rgba(0,255,255,0.7)', 'rgba(0,255,255,0.3)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* JARVIS Text */}
                    <div className="relative text-center z-30">
                      <motion.p
                        className="text-[10px] uppercase tracking-[0.6em] text-cyan/70 font-mono"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        AI Core
                      </motion.p>
                      <motion.p
                        className="mt-2 text-3xl font-black uppercase tracking-[0.2em] text-white font-display sm:text-4xl"
                        style={{ textShadow: '0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.3), 0 0 80px rgba(0,163,255,0.2)' }}
                        animate={{ opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        JARVIS
                      </motion.p>
                      <motion.p
                        className="mt-1 text-[9px] uppercase tracking-[0.5em] text-blue/60 font-mono"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Online
                      </motion.p>
                    </div>
                  </div>

                  {/* Scan line sweeping across core */}
                  <motion.div
                    className="absolute left-[10%] right-[10%] h-[2px] z-30 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.6), rgba(0,229,255,0.8), rgba(0,255,255,0.6), transparent)',
                      boxShadow: '0 0 12px rgba(0,255,255,0.5)',
                    }}
                    animate={{ top: ['10%', '90%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                  />

                  {/* Energy pulse rings expanding outward */}
                  <motion.div
                    className="absolute rounded-full border border-cyan/30 z-5 pointer-events-none"
                    style={{ inset: '90px' }}
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute rounded-full border border-blue/20 z-5 pointer-events-none"
                    style={{ inset: '90px' }}
                    animate={{ scale: [1, 3], opacity: [0.3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 2 }}
                  />

                  {/* Corner data readouts */}
                  <div className="absolute top-2 right-4 text-right z-30">
                    <motion.p
                      className="text-[8px] font-mono uppercase tracking-[0.3em] text-cyan/50"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      SYS: ACTIVE
                    </motion.p>
                    <motion.p
                      className="text-[8px] font-mono uppercase tracking-[0.3em] text-blue/40"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      NET: 99.9%
                    </motion.p>
                  </div>
                  <div className="absolute bottom-2 left-4 z-30">
                    <motion.p
                      className="text-[8px] font-mono uppercase tracking-[0.3em] text-cyan/50"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    >
                      Portfolio v2.0
                    </motion.p>
                    <motion.p
                      className="text-[8px] font-mono uppercase tracking-[0.3em] text-blue/40"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      Core: Stable
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── About Section ──────────────────────────────────────────────── */}
        <HoloSection
          id="about"
          eyebrow="About Me"
          title="Mission Profile"
          description={profile.mission}
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="holo-panel holo-border relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.14),transparent_35%)]" />
              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                  <span className="rounded-full border border-cyan/15 bg-white/5 px-3 py-1 text-xs text-mist/80">{profile.title}</span>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">{profile.intro}</p>

                {/* Animated Statistics */}
                <div className="grid gap-4 sm:grid-cols-5">
                  {[
                    { label: 'CGPA', value: 9.11, decimals: 2 },
                    { label: 'Hackathons', value: 2, decimals: 0 },
                    { label: 'Projects', value: 10, suffix: '+', decimals: 0 },
                    { label: 'Certifications', value: 6, decimals: 0 },
                    { label: 'Languages', value: 9, decimals: 0 },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-cyan/15 bg-white/5 p-4 text-center">
                      <p className="text-2xl font-bold text-cyan">
                        <AnimatedCounter target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={profile.resumeHref} download className="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] btn-magnetic">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 btn-magnetic">
                    <Mail className="h-4 w-4" />
                    Contact Channel
                  </a>
                </div>
              </div>
            </div>
            <AssistantPanel />
          </div>
        </HoloSection>

        {/* ─── Experience Section ─────────────────────────────────────────── */}
        <HoloSection
          id="experience"
          eyebrow="Experience"
          title="Mission Timeline"
          description="Professional experience and internship journey."
        >
          <div className="space-y-6">
            {experiences.map((item, index) => (
              <motion.div
                key={`${item.role}-${index}`}
                whileHover={{ x: 6 }}
                className="holo-panel holo-border relative overflow-hidden p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.1),transparent_40%)]" />
                <div className="relative space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-6 w-6 text-cyan" />
                      <div>
                        <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                        <span className="rounded-full border border-cyan/15 bg-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan">
                          {item.organization}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{item.period}</p>
                  </div>
                  <p className="max-w-3xl text-sm leading-7 text-slate-300">{item.summary}</p>

                  {/* Task Cards */}
                  {item.tasks && (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {item.tasks.map((task) => (
                        <motion.div
                          key={task}
                          whileHover={{ y: -4 }}
                          className="rounded-2xl border border-cyan/15 bg-white/5 p-4 transition hover:border-cyan/30 hover:bg-cyan/5 neon-hover"
                        >
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-cyan shrink-0" />
                            <p className="text-sm text-white">{task}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </HoloSection>

        {/* ─── Projects Section ───────────────────────────────────────────── */}
        <HoloSection
          id="projects"
          eyebrow="Project Database"
          title="Mission Archive"
          description="Each project is a holographic data file from the mission archive."
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition btn-magnetic ${activeFilter === filter ? 'bg-cyan text-slate-950' : 'border border-cyan/20 bg-white/5 text-white hover:border-cyan/50 hover:bg-cyan/10'}`}
                >
                  <Filter className="h-4 w-4" />
                  {filter}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 rounded-full border border-cyan/15 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <Search className="h-4 w-4 text-cyan" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </label>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </HoloSection>

        {/* ─── Skills Section ─────────────────────────────────────────────── */}
        <HoloSection
          id="skills"
          eyebrow="Core Systems"
          title="Skills Matrix"
          description="Technical capabilities organized by domain with holographic power rings."
        >
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <div key={category}>
                  <div className="mb-4 flex items-center gap-3">
                    {categoryIcons[category]}
                    <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-white">{category}</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan/30 to-transparent" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {categorySkills.map((skill) => (
                      <SkillRing key={skill.name} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </HoloSection>

        {/* ─── Achievements Section ───────────────────────────────────────── */}
        <HoloSection
          id="achievements"
          eyebrow="Achievements"
          title="Mission Accomplishments"
          description="Notable achievements and competition results."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.title}
                whileHover={{ y: -8, scale: 1.01 }}
                className="holo-panel-strong achievement-glow relative overflow-hidden p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.14),transparent_40%)]" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 shadow-glow">
                      {achievement.icon === 'trophy' ? (
                        <Trophy className="h-7 w-7 text-cyan" />
                      ) : achievement.icon === 'medal' ? (
                        <Medal className="h-7 w-7 text-cyan" />
                      ) : (
                        <Award className="h-7 w-7 text-cyan" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan">{achievement.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{achievement.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </HoloSection>

        {/* ─── Certifications Section ─────────────────────────────────────── */}
        <HoloSection
          id="certifications"
          eyebrow="Certifications"
          title="Verified Credentials"
          description="Certified badges and professional qualifications."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification) => (
              <motion.div
                key={certification.name}
                whileHover={{ y: -6 }}
                className="holo-panel holo-border neon-hover shimmer-border p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <ShieldCheck className="h-6 w-6 text-cyan" />
                  <span className="rounded-full border border-cyan/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan/80">
                    {certification.year}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{certification.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan/70">{certification.issuer}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{certification.note}</p>
              </motion.div>
            ))}
          </div>
        </HoloSection>

        {/* ─── Education Section ──────────────────────────────────────────── */}
        <HoloSection
          id="education"
          eyebrow="Education"
          title="Academic Timeline"
          description="Educational journey across premier institutions."
        >
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ x: 6 }}
                className="holo-panel holo-border relative overflow-hidden p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.1),transparent_35%)]" />
                <div className="relative grid gap-4 md:grid-cols-[160px_1fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan/70">Education</p>
                    <p className="mt-2 text-sm text-slate-300">{edu.period}</p>
                    {edu.cgpa && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1">
                        <span className="text-xs uppercase tracking-[0.3em] text-cyan">CGPA</span>
                        <span className="text-sm font-bold text-white">{edu.cgpa}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <GraduationCap className="h-6 w-6 text-cyan" />
                      <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                    </div>
                    <span className="mt-2 inline-block rounded-full border border-cyan/15 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan/80">
                      {edu.institution}
                    </span>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{edu.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </HoloSection>

        {/* ─── GitHub & LeetCode Analytics ────────────────────────────────── */}
        <HoloSection
          id="analytics"
          eyebrow="Analytics"
          title="Live Telemetry"
          description="Public profile and problem-solving statistics streamed from live endpoints."
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Followers', value: stats.github.followers },
                { label: 'Public Repos', value: stats.github.repos },
                { label: 'Stars', value: stats.github.stars },
                { label: 'Following', value: stats.github.following },
              ].map((item) => (
                <div key={item.label} className="holo-panel holo-border p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan/70">{item.label}</p>
                  <p className="mt-3 text-4xl font-black text-white">{item.value}</p>
                </div>
              ))}
              <div className="holo-panel holo-border p-5 sm:col-span-2 xl:col-span-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan/70">GitHub Profile</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{stats.github.name}</h3>
                  </div>
                  <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-cyan/50 hover:bg-cyan/10 btn-magnetic">
                    <Github className="h-4 w-4" />
                    Open Profile
                  </a>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">{stats.github.bio}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="holo-panel holo-border p-5">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-cyan">
                  <BookOpen className="h-4 w-4" />
                  LeetCode Stats
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Solved', value: stats.leetcode.totalSolved },
                    { label: 'Easy', value: stats.leetcode.easySolved },
                    { label: 'Medium', value: stats.leetcode.mediumSolved },
                    { label: 'Hard', value: stats.leetcode.hardSolved },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-cyan/15 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan/70">{item.label}</p>
                      <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-cyan/15 bg-black/30 p-4 text-sm text-slate-300">
                  Ranking status: <span className="text-cyan">{stats.leetcode.ranking}</span>
                </div>
              </div>
            </div>
          </div>
        </HoloSection>

        {/* ─── Contact Section ────────────────────────────────────────────── */}
        <HoloSection
          id="contact"
          eyebrow="Contact Terminal"
          title="Open Communication Channel"
          description="Send a transmission or connect through available communication channels."
        >
          <ContactTerminal />
        </HoloSection>

        {/* ─── Footer ─────────────────────────────────────────────────────── */}
        <footer className="mx-auto w-full max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-mist/50">
              Designed and Engineered by
            </p>
            <p className="font-display text-lg font-bold uppercase tracking-[0.15em] text-white glow-text">
              Sungala Eswar Aditya Reddy
            </p>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan/60">
              Powered by Artificial Intelligence
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-white/5 px-4 py-2 text-cyan transition hover:border-cyan/40 hover:bg-cyan/10">
                <Mail className="h-4 w-4" /> Mail
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-white/5 px-4 py-2 text-cyan transition hover:border-cyan/40 hover:bg-cyan/10">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-white/5 px-4 py-2 text-cyan transition hover:border-cyan/40 hover:bg-cyan/10">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={`tel:+91${profile.phone}`} className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-white/5 px-4 py-2 text-cyan transition hover:border-cyan/40 hover:bg-cyan/10">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* ─── Boot Screen Overlay ──────────────────────────────────────────── */}
      <AnimatePresence>{!bootComplete ? <BootScreen key="boot-overlay" onReady={() => setBootComplete(true)} /> : null}</AnimatePresence>
    </div>
  );
}
