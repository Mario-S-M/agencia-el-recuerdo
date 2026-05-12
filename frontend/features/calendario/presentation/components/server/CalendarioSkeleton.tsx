export function CalendarioSkeleton(): React.ReactElement {
  return (
    <div className="flex flex-col h-full gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-white/10" />
        <div className="h-5 w-48 rounded bg-white/10" />
        <div className="h-8 w-8 rounded-lg bg-white/10" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="h-5 w-16 rounded bg-white/10" />
      </div>
      <div className="grid grid-cols-7 flex-1 gap-px rounded-xl bg-white/5 overflow-hidden">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="min-h-[80px] bg-[#0a0f1a] p-2">
            <div className="h-6 w-6 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
