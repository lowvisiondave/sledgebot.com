import Link from "next/link";

export const dynamic = "force-dynamic";

async function getSystemStatus() {
  const timestamp = new Date().toISOString();
  
  // Fetch OpenClaw heartbeat status from Healthchecks.io
  let heartbeatStatus = null;
  try {
    const res = await fetch(
      'https://healthchecks.io/badge/50bd22f9-161d-4efd-a3f9-ec0b56/vQ_ZDuGn-2.json',
      { next: { revalidate: 30 } }
    );
    if (res.ok) {
      heartbeatStatus = await res.json();
    }
  } catch (e) {
    // Silent fail
  }
  
  return {
    timestamp,
    heartbeatStatus,
  };
}

function StatusIndicator({ status }: { status: string | null }) {
  if (status === 'up') {
    return <span className="text-[#40e040] text-sm">● Operational</span>;
  } else if (status === 'late' || status === 'grace') {
    return <span className="text-[#e0e040] text-sm">● Degraded</span>;
  } else if (status === 'down') {
    return <span className="text-[#e04040] text-sm">● Down</span>;
  }
  return <span className="text-[#808080] text-sm">○ Unknown</span>;
}

export default async function Status() {
  const status = await getSystemStatus();
  
  const overallUp = status.heartbeatStatus?.status === 'up';

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
          <p className="text-lg text-[#808080]">&quot;Sledgy sees you. Sledgy helps.&quot;</p>
        </header>

        {/* Status Banner */}
        <section className={`border-2 p-8 ${overallUp ? 'border-[#40e040] bg-[#40e040]/5' : 'border-[#e04040] bg-[#e04040]/5'}`}>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-2xl ${overallUp ? 'text-[#40e040]' : 'text-[#e04040]'}`}>●</span>
            <h1 className={`text-2xl font-bold uppercase tracking-wider ${overallUp ? 'text-[#40e040]' : 'text-[#e04040]'}`}>
              {overallUp ? 'All Systems Operational' : 'System Issues Detected'}
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
                <p className="text-[#606060] text-xs mt-1">Heartbeat every 30 min</p>
              </div>
              <StatusIndicator status={status.heartbeatStatus?.status} />
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
