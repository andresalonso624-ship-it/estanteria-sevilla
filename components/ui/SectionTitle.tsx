type Props = {
  subtitle: string;
  title: string;
};

export default function SectionTitle({
  subtitle,
  title,
}: Props) {
  return (
    <div className="text-center">

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C6922F]">
        {subtitle}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#111111]">
        {title}
      </h2>

      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6922F]" />

    </div>
  );
}