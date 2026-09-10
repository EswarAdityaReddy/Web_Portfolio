import { FormEvent, useMemo, useState } from 'react';
import HolographicPanel from './HolographicPanel';

interface CommandConsoleProps {
  title: string;
  eyebrow: string;
  prompt: string;
  instructions: string;
  responses: Record<string, string>;
  presetGreeting: string;
  commandExamples: string[];
}

interface ConsoleLine {
  id: number;
  role: 'system' | 'user' | 'assistant';
  text: string;
}

export default function CommandConsole({
  title,
  eyebrow,
  prompt,
  instructions,
  responses,
  presetGreeting,
  commandExamples,
}: CommandConsoleProps) {
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<ConsoleLine[]>([
    { id: 1, role: 'system', text: instructions },
    { id: 2, role: 'assistant', text: presetGreeting },
  ]);

  const commandList = useMemo(() => commandExamples, [commandExamples]);

  const runCommand = (command: string) => {
    const cleaned = command.trim().toLowerCase();
    if (!cleaned) {
      return;
    }

    if (cleaned === 'clear') {
      setLines([
        { id: Date.now(), role: 'system', text: instructions },
        { id: Date.now() + 1, role: 'assistant', text: responses.clear ?? 'Console cleared.' },
      ]);
      return;
    }

    const response = responses[cleaned] ?? responses.error ?? 'No response configured.';
    setLines((current) => [
      ...current,
      { id: Date.now(), role: 'user', text: `${prompt} ${command}` },
      { id: Date.now() + 1, role: 'assistant', text: response },
    ]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(value);
    setValue('');
  };

  return (
    <HolographicPanel eyebrow={eyebrow} title={title} className="h-full">
      <div className="space-y-4">
        <div className="rounded-2xl border border-cyan/10 bg-black/30 p-4 font-mono text-sm text-mist/80">
          <div className="space-y-2">
            {lines.map((line) => (
              <p key={line.id} className={line.role === 'assistant' ? 'text-cyan/85' : line.role === 'user' ? 'text-white' : 'text-mist/55'}>
                {line.text}
              </p>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label className="flex-1 rounded-2xl border border-cyan/10 bg-black/30 px-4 py-3 font-mono text-sm text-cyan/75">
            <span className="sr-only">Command input</span>
            <span className="mr-2 text-cyan/55">{prompt}</span>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="w-[calc(100%-10rem)] bg-transparent outline-none placeholder:text-mist/30"
              placeholder="type a command"
            />
          </label>
          <button type="submit" className="rounded-2xl border border-cyan/30 bg-cyan/10 px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:bg-cyan/20">
            Execute
          </button>
        </form>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.28em] text-cyan/60">
          {commandList.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => {
                runCommand(command);
                setValue('');
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan/30 hover:text-white"
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </HolographicPanel>
  );
}