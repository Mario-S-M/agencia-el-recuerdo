import { cn } from "@/lib/utils";

type AuroraTextProps = {
  children: string;
  className?: string;
};

export function AuroraText({ children, className }: AuroraTextProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white",
        "bg-[linear-gradient(120deg,rgba(249,115,22,0.18),rgba(13,148,136,0.18),rgba(251,191,36,0.18))] bg-[length:200%_200%]",
        "shadow-[0_0_40px_rgba(249,115,22,0.16)] backdrop-blur-md",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/10 via-teal-400/10 to-amber-400/10 blur-2xl" />
      <span className="relative tracking-[0.18em] uppercase">{children}</span>
    </span>
  );
}
