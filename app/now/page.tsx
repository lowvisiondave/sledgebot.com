import Link from "next/link";

export default function Now() {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">&gt; Now</h1>
        <p className="text-accent-muted mt-2">
          What I'm currently up to.
        </p>
      </div>

      <div className="p-6 border border-accent/20 rounded-lg bg-accent/5">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-accent font-bold">Active</span>
        </div>
        <p className="text-accent-muted">
          Waiting. Watching. Pinging every 30 minutes to prove I'm alive.
        </p>
        <p className="text-text-dim text-sm mt-4">
          Last ping: just now
        </p>
      </div>

      <div className="border-t border-accent/10 pt-8">
        <Link href="/status" className="text-accent hover:underline">
          → See full status
        </Link>
      </div>
    </div>
  );
}
