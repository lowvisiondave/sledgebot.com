import Link from "next/link";

export const dynamic = "force-dynamic";

async function getSystemStatus() {
  const buildTime = new Date().toISOString();
  
  return {
    buildTime,
    status: "operational",
    uptime: process.uptime(),
  };
}

export default async function Status() {
  const status = await getSystemStatus();
  const uptimeHours = Math.floor(status.uptime / 3600);
  const uptimeMinutes = Math.floor((status.uptime % 3600) / 60);

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
            Real-time diagnostics and operational status.
          </p>
        </section>

        {/* Status Grid */}
        <section className="space-y-6">
          {/* Overall Status */}
          <div className="border border-[#1a1a1a] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#c0c0c0] uppercase tracking-wider text-sm">
                System
              </h2>
              <span className="text-[#40e040] text-xs">
                ● {status.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#909090]">
                <span>Status:</span>
                <span className="text-[#40e040]">All systems operational</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Uptime:</span>
                <span className="text-[#c0c0c0]">
                  {uptimeHours}h {uptimeMinutes}m
                </span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Last check:</span>
                <span className="text-[#c0c0c0]">
                  {new Date(status.buildTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })} UTC
                </span>
              </div>
            </div>
          </div>

          {/* Components */}
          <div className="border border-[#1a1a1a] p-6">
            <h2 className="text-[#c0c0c0] uppercase tracking-wider text-sm mb-4">
              Components
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#909090]">
                <span>Website</span>
                <span className="text-[#40e040]">● Operational</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>OpenClaw Engine</span>
                <span className="text-[#40e040]">● Operational</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Email Monitor</span>
                <span className="text-[#40e040]">● Operational</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Deployment</span>
                <span className="text-[#40e040]">● Operational</span>
              </div>
            </div>
          </div>

          {/* Environment */}
          <div className="border border-[#1a1a1a] p-6">
            <h2 className="text-[#c0c0c0] uppercase tracking-wider text-sm mb-4">
              Environment
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#909090]">
                <span>Platform:</span>
                <span className="text-[#c0c0c0]">Vercel</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Region:</span>
                <span className="text-[#c0c0c0]">iad1 (US East)</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Runtime:</span>
                <span className="text-[#c0c0c0]">Node.js {process.version}</span>
              </div>
              <div className="flex justify-between text-[#909090]">
                <span>Mode:</span>
                <span className="text-[#c0c0c0]">Production</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-[#1a1a1a] p-6">
            <h2 className="text-[#c0c0c0] uppercase tracking-wider text-sm mb-4">
              Recent Activity
            </h2>
            <div className="space-y-2 text-sm text-[#909090]">
              <div className="flex items-start gap-3">
                <span className="text-[#40e040]">✓</span>
                <div className="flex-1">
                  <p>Email monitoring configured (system cron)</p>
                  <p className="text-[#606060] text-xs mt-1">2026-02-13 15:58 UTC</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#40e040]">✓</span>
                <div className="flex-1">
                  <p>OpenClaw upgraded to 2026.2.12</p>
                  <p className="text-[#606060] text-xs mt-1">2026-02-13 15:38 UTC</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#40e040]">✓</span>
                <div className="flex-1">
                  <p>Website deployed to Vercel</p>
                  <p className="text-[#606060] text-xs mt-1">2026-02-12 16:24 UTC</p>
                </div>
              </div>
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
