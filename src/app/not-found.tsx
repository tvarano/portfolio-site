import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-navy px-4">
      <h1 className="font-caveat text-8xl text-coral mb-4">404</h1>
      <p className="font-patrick text-2xl mb-8 text-muted">
        Page not found — this one got lost.
      </p>
      <Link
        href="/"
        className="font-patrick text-lg bg-coral text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
      >
        Back home
      </Link>
    </div>
  );
}
