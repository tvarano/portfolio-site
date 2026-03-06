"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-navy px-4">
      <h1 className="font-caveat text-8xl text-coral mb-4">500</h1>
      <p className="font-patrick text-2xl mb-8 text-muted">
        uhhhh thats not good!
      </p>
      <button
        onClick={reset}
        className="font-patrick text-lg bg-coral px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
      >
        Try again
      </button>
    </div>
  );
}
