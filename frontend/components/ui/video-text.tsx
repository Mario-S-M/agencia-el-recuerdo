import { cn } from "@/lib/utils";

type VideoTextProps = {
  children: string;
  videoSrc: string;
  className?: string;
};

export function VideoText({ children, videoSrc, className }: VideoTextProps) {
  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden rounded-[1.75rem] border border-white/10 px-4 py-2 align-middle shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        src={videoSrc}
      />
      <span className="absolute inset-0 bg-[#050A18]/45 backdrop-blur-sm" />
      <span className="relative text-white font-black tracking-tight">
        {children}
      </span>
    </span>
  );
}
