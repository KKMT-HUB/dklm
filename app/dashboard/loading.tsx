export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="max-w-3xl animate-pulse motion-reduce:animate-none">
      <div className="h-9 w-56 rounded-lg bg-primary-100" />
      <div className="mt-4 h-4 w-80 max-w-full rounded bg-primary-100/70" />
      <div className="mt-8 h-48 rounded-2xl bg-primary-100/50" />
    </div>
  );
}
