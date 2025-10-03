export function BlurBlob({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-200/50 via-amber-100/40 to-cyan-200/40 blur-[100px] ${className}`}
    />
  );
}
