import Link from "next/link";

export const dynamic = "force-dynamic";

async function getSystemStatus() {
  const timestamp = new Date().toISOString();
  
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

export default async function Status() {
  const status = await getSystemStatus();
  
  const engineUp = status.heartbeatStatus?.status === 'up';
  const engineLate = status.heartbeatStatus?.status === 'late' || status.heartbeatStatus?.status === 'grace';
  const allUp = engineUp;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#c0c0c0] font-mono selection:bg-red-900/40">
      <main className="max-w-xl mx-auto px-8 py-24 space-y-16">
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

        {/* Status Display */}
        <section className="space-y-6">
          <h2 className="text-[#e04040] text-sm font-bold tracking-wider uppercase">&gt; status</h2>
          
          <div className="space-y-4">
            {/* Main status indicator */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${allUp ? 'bg-[#40e040] shadow-[0_0_10px_#40e040]' : engineLate ? 'bg-[#e0e040] shadow-[0_0_10px_#e0e040]' : 'bg-[#e04040] shadow-[0_0_10px_#e04040]'} animate-pulse`} />
              <span className="text-white text-lg">
                {allUp ? 'Systems nominal' : engineLate ? 'Degraded' : 'Offline'}
              </span>
            </div>

            {/* ASCII-style system readout */}
            <div className="font-mono text-sm space-y-1 pl-6 border-l border-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <span className={engineUp ? 'text-[#40e040]' : engineLate ? 'text-[#e0e040]' : 'text-[#e04040]'}>
                  {engineUp ? '■' : engineLate ? '◧' : '□'}
                </span>
                <span className="text-[#808080]">CORE</span>
                <span className="text-[#505050]">................</span>
                <span className={engineUp ? 'text-[#40e040]' : engineLate ? 'text-[#e0e040]' : 'text-[#e04040]'}>
                  {engineUp ? 'ONLINE' : engineLate ? 'LATE' : 'OFFLINE'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#40e040]">■</span>
                <span className="text-[#808080]">WEB</span>
                <span className="text-[#505050]">..................</span>
                <span className="text-[#40e040]">ONLINE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostics */}
        <section className="space-y-6">
          <h2 className="text-[#e04040] text-sm font-bold tracking-wider uppercase">&gt; diagnostics</h2>
          
          <div className="text-sm text-[#606060] space-y-2">
            <p>
              <span className="text-[#808080]">last_ping:</span>{' '}
              {new Date(status.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'UTC'
              })} UTC
            </p>
            <p>
              <span className="text-[#808080]">uptime_check:</span>{' '}
              <a 
                href="https://healthchecks.io" 
                className="text-[#505050] hover:text-[#e04040] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                healthchecks.io
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-10 border-t border-[#1a1a1a]">
          <p className="text-[#303030] text-xs text-center">
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
