import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypingText({ text, speed = 30, className = '' }: TypingTextProps) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    setVisibleText('');

    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [speed, text]);

  return <span className={className}>{visibleText}<span className="console-caret" /></span>;
}