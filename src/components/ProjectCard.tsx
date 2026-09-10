interface ProjectCardProps {
  name: string;
  category: string;
  summary: string;
  tech: string[];
  metrics: string;
}

export default function ProjectCard({ name, category, summary, tech, metrics }: ProjectCardProps) {
  return (
    <article className="group holo-border rounded-[1.75rem] border border-cyan/10 bg-white/5 p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan/35 hover:bg-white/8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan/65">{category}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{name}</h3>
        </div>
        <div className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs text-cyan/85">{metrics}</div>
      </div>
      <p className="mt-4 text-sm leading-6 text-mist/72">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-mist/70">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}