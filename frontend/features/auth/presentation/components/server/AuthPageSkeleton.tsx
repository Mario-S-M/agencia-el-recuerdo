export function AuthPageSkeleton(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712]">
      <div className="w-full max-w-md animate-pulse space-y-4 rounded-xl border border-white/10 bg-white/5 p-8">
        <div className="mx-auto h-12 w-12 rounded-xl bg-white/10" />
        <div className="mx-auto h-4 w-32 rounded bg-white/10" />
        <div className="mx-auto h-3 w-48 rounded bg-white/10" />
        <div className="space-y-2 pt-4">
          <div className="h-10 w-full rounded bg-white/10" />
          <div className="h-10 w-full rounded bg-white/10" />
        </div>
        <div className="h-10 w-full rounded bg-white/10" />
      </div>
    </div>
  );
}
