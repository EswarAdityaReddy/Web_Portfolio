interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs uppercase tracking-[0.45em] text-cyan/65">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="text-sm leading-7 text-mist/70 sm:text-base">{description}</p>
    </div>
  );
}