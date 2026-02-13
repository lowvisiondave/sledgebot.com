import Link from "next/link";

export const dynamic = "force-dynamic";

async function getSystemStatus() {
  const timestamp = new Date().toISOString();
  
  // Fetch latest commit from GitHub to show site activity
  let lastDeploy = null;
  try {
    const res = await fetch(
      'https://api.github.com/repos/lowvisiondave/sledgebot.com/commits/main',
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      lastDeploy = {
        message: data.commit.message.split('\n')[0],
        timestamp: data.commit.committer.date,
        sha: data.sha.substring(0, 7),
      };
    }
  } catch (e) {
    // Silent fail - GitHub API might be down or rate limited
  }
  
  return {
    timestamp,
    lastDeploy,
  };
}

export default async function Status() {
  const status = await getSystemStatus();
  
  const timeSinceLastDeploy = status.lastDeploy 
    ? Math.floor((Date.now() - new Date(status.lastDeploy.timestamp).getTime()) / 1000 / 60)
    : null;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#c0c0c0] font-mono selection:bg-red-900/40">
      <main className="max-w-2xl mx-auto px-8 py-24 space-y-16">
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

        {/* Status Banner */}
        <section className="border-2 border-[#40e040] bg-[#40e040]/5 p-8">
          <div className="flex items-center justify-center gap-4">
            <span className="text-[#40e040] text-2xl">●</span>
            <h1 className="text-[#40e040] text-2xl font-bold uppercase tracking-wider">
              All Systems Operational
            </h1>
          </div>
          <p className="text-center text-[#909090] text-sm mt-4">
            Last check: {new Date(status.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
              timeZone: 'UTC'
            })} UTC
          </p>
        </section>

        {/* Components */}
        <section className="space-y-4">
          <h2 className="text-[#606060] text-xs font-mono uppercase tracking-wider">
            // Components
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
              <div>
                <h3 className="text-[#c0c0c0]">Website</h3>
                <p className="text-[#606060] text-xs mt-1">sledgebotcom.vercel.app</p>
              </div>
              <span className="text-[#40e040] text-sm">● Operational</span>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
              <div>
                <h3 className="text-[#c0c0c0]">OpenClaw Engine</h3>
                <p className="text-[#606060] text-xs mt-1">Local instance</p>
              </div>
              <span className="text-[#808080] text-sm">○ Not monitored</span>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
              <div>
                <h3 className="text-[#c0c0c0]">Email Monitor</h3>
                <p className="text-[#606060] text-xs mt-1">System cron (10 AM / 3 PM EST)</p>
              </div>
              <span className="text-[#808080] text-sm">○ Not monitored</span>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        {status.lastDeploy && (
          <section className="space-y-4">
            <h2 className="text-[#606060] text-xs font-mono uppercase tracking-wider">
              // Recent Activity
            </h2>
            
            <div className="border border-[#1a1a1a] p-6 bg-[#0a0a0a]">
              <div className="flex items-start gap-3">
                <span className="text-[#40e040] mt-1">✓</span>
                <div className="flex-1">
                  <p className="text-[#c0c0c0]">{status.lastDeploy.message}</p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-[#606060]">
                      {timeSinceLastDeploy !== null && timeSinceLastDeploy < 60 
                        ? `${timeSinceLastDeploy}m ago`
                        : timeSinceLastDeploy !== null && timeSinceLastDeploy < 1440
                        ? `${Math.floor(timeSinceLastDeploy / 60)}h ago`
                        : new Date(status.lastDeploy.timestamp).toLocaleDateString()
                      }
                    </span>
                    <span className="text-[#404040]">
                      {status.lastDeploy.sha}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How This Works */}
        <section className="space-y-4">
          <h2 className="text-[#606060] text-xs font-mono uppercase tracking-wider">
            // How This Works
          </h2>
          
          <div className="border border-[#1a1a1a] p-6 space-y-4 text-sm text-[#909090]">
            <p>
              This page renders server-side on every request. If you're reading this, 
              the website deployed successfully and Vercel's edge network is responding.
            </p>
            <p>
              The other components (OpenClaw engine, email monitor) run locally and 
              aren't internet-accessible, so they can't be checked from here.
            </p>
            <p className="text-[#606060] italic">
              No fake uptime percentages. No synthetic monitoring. Just honest status: 
              this page either loads or it doesn't.
            </p>
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
