export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-sky-500 border-r-sky-500" />
      </div>
    </div>
  );
}

export function LoadingPlaceholder() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 animate-pulse rounded-xl bg-zinc-900/80" />
      ))}
    </div>
  );
}
