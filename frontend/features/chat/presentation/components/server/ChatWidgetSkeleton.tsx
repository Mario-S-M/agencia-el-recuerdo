export function ChatWidgetSkeleton(): React.ReactElement {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-14 h-14 rounded-full bg-white/10 animate-pulse" />
    </div>
  );
}
