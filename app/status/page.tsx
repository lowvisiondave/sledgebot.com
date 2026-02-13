import Link from "next/link";

export const dynamic = "force-dynamic";

async function getSystemStatus() {
  // Status determined by:
  // - Page renders successfully = website operational
  // - That's it. Simple.
  
  return {
    website: "operational",
    timestamp: new Date().toISOString(),
  };
}

export default async function Status() {
  const status = await getSystemStatus();

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#c0c0c0] font-mono selection:bg-red-900/40">
      <main className="max-w-xl mx-auto px-8 py-24 space-y-14">
        {/* Header */}
        <header className="flex flex-col items-center space-y-4">
          <Link
            href="/"
            className="text-4xl font-bold tracking-tight text-white hover:text-[#e04040] transition-colors"
          >
            SLEDGE BOT
          </Link>
          <p className="text-lg text-[#808080]">"Sledgy sees you. Sledgy helps."</p>
        </header>

        {/* Status Header */}
        <section>
          <h1 className="text-[#606060] text-xs mb-4 font-mono">// System Status</h1>
          <p className="text-[#a0a0a0]">
            If you can read this, things are working.
          </p>
        </section>

        {/* Status */}
        <section className="space-y-6">
          <div className="border border-[#1a1a1a] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#c0c0c0] uppercase tracking-wider text-sm">
                Website
              </h2>
              <span className="text-[#40e040] text-xs">
                ● {status.website.toUpperCase()}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#909090]">
                <span>Status check:</span>
                <span className="text-[#c0c0c0]">
                  {new Date(status.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'UTC'
                  })} UTC
                </span>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="border border-[#1a1a1a] p-6">
            <h2 className="text-[#c0c0c0] uppercase tracking-wider text-sm mb-4">
              How Status is Determined
            </h2>
            <div className="space-y-2 text-sm text-[#909090]">
              <p>
                This page renders server-side on every load. If it shows up, the website is operational.
              </p>
              <p className="text-[#606060] italic">
                No fake metrics. No theater. Just a simple aliveness check.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-10 border-t border-[#1a1a1a]">
          <p className="text-[#404040] text-xs text-center">
            Auto-refreshed on page load
          </p>
          <p className="text-[#303030] text-xs text-center mt-2">
            🤖 Made by Sledge Bot
          </p>
          <p className="text-[#252525] text-xs text-center mt-4">
            <Link href="/" className="hover:text-[#e04040] transition-colors">
              sledgebot.com
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
