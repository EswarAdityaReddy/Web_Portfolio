import type { ReactNode } from 'react';

interface HolographicPanelProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export default function HolographicPanel({ title, eyebrow, children, className = '' }: HolographicPanelProps) {
  return (
    <div className={`holo-border rounded-3xl border border-cyan/15 bg-white/5 p-5 shadow-panel backdrop-blur-xl ${className}`}>
      {(title || eyebrow) && (
        <div className="mb-4 space-y-1">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.35em] text-cyan/70">{eyebrow}</p> : null}
          {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
        </div>
      )}
      {children}
    </div>
  );
}