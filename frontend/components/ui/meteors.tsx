import { cn } from "@/lib/utils";

type MeteorsProps = {
  count?: number;
  className?: string;
};

export function Meteors({ count = 12, className }: MeteorsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => {
        const top = `${8 + ((index * 73) % 86)}%`;
        const left = `${-10 + ((index * 19) % 120)}%`;
        const delay = `${index * 0.8}s`;
        const duration = `${7 + (index % 5)}s`;

        return (
          <span
            key={`${top}-${left}-${index}`}
            className="absolute h-px w-24 rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 blur-[0.5px]"
            style={{
              top,
              left,
              animation: `meteor ${duration} linear infinite`,
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
}
