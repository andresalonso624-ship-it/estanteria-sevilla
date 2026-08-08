import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-8 py-4 font-semibold transition";

  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-[#C6922F]"
      : "border border-black text-black hover:bg-black hover:text-white";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}