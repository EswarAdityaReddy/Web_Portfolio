interface SkillRingProps {
  name: string;
  value: number;
  detail: string;
}

export default function SkillRing({ name, value, detail }: SkillRingProps) {
  return (
    <div className="holo-border rounded-[1.75rem] border border-cyan/10 bg-white/5 p-6 shadow-panel backdrop-blur-xl">
      <div
        className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-cyan/15"
        style={{
          background: `conic-gradient(#00ffff 0% ${value}%, rgba(229,249,255,0.08) ${value}% 100%)`,
        }}
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-[#03101b]/95 text-center">
          <div>
            <p className="text-2xl font-semibold text-white">{value}%</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan/65">online</p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-mist/70">{detail}</p>
      </div>
    </div>
  );
}