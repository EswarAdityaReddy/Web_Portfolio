import { useEffect, useState } from 'react';

const roles = [
  'AI Engineer',
  'Flutter Developer',
  'Java Developer',
  'ML Engineer',
  'Automation Developer',
  'Full Stack Learner',
];

export default function TypingRoles({ className = '' }: { className?: string }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: number;

    if (!isDeleting) {
      if (text.length < currentRole.length) {
        timeout = window.setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 80);
      } else {
        timeout = window.setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = window.setTimeout(() => {
          setText(text.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeout = window.setTimeout(() => {}, 500);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className={`font-mono text-cyan ${className}`}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-cyan animate-pulse" />
    </span>
  );
}
