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

  // Fetch latest commit from GitHub
  let lastCommit = null;
  try {
    const res = await fetch(
      'https://api.github.com/repos/lowvisiondave/sledgebot.com/commits/main',
      { next: { revalidate: 300 } }
    );
    if (res.ok) {
      const data = await res.json();
      lastCommit = {
        sha: data.sha.substring(0, 7),
        date: data.commit.committer.date,
      };
    }
  } catch (e) {
    // Silent fail
  }
  
  return {
    timestamp,
    heartbeatStatus,
    lastCommit,
  };
}

function StatusLine({ label, status, ok }: { label: string; status: string; ok: boolean | null }) {
  const color = ok === true ? 'text-[#40e040]' : ok === false ? 'text-[#e04040]' : 'text-[#e0e040]';
  const icon = ok === true ? '■' : ok === false ? '□' : '◧';
  
  return (
    <div className="flex items-center font-mono text-sm">
      <span className={color}>{icon}</span>
      <span className="text-[#808080] ml-2 w-12">{label}</span>
      <span className="text-[#303030] flex-1 overflow-hidden whitespace-nowrap">
        {'·'.repeat(30)}
      </span>
      <span className={`${color} ml-2`}>{status}</span>
    </div>
  );
}

export default async function Status() {
  const status = await getSystemStatus();
  
  const engineUp = status.heartbeatStatus?.status === 'up';
  const engineLate = status.heartbeatStatus?.status === 'late' || status.heartbeatStatus?.status === 'grace';
  const allUp = engineUp;

  // Calculate time since last commit
  const commitAge = status.lastCommit ? Math.floor((Date.now() - new Date(status.lastCommit.date).getTime()) / 1000 / 60) : null;
  const commitAgeStr = commitAge !== null 
    ? commitAge < 60 ? `${commitAge}m ago`
    : commitAge < 1440 ? `${Math.floor(commitAge / 60)}h ago`
    : `${Math.floor(commitAge / 1440)}d ago`
    : null;

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

            {/* System readout */}
            <div className="space-y-1 pl-6 border-l border-[#1a1a1a]">
              <StatusLine 
                label="CORE" 
                status={engineUp ? 'ONLINE' : engineLate ? 'LATE' : 'OFFLINE'} 
                ok={engineUp ? true : engineLate ? null : false} 
              />
              <StatusLine label="WEB" status="ONLINE" ok={true} />
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="space-y-6">
          <h2 className="text-[#e04040] text-sm font-bold tracking-wider uppercase">&gt; info</h2>
          
          <div className="text-sm space-y-2 pl-6 border-l border-[#1a1a1a]">
            <p>
              <span className="text-[#505050]">engine</span>{' '}
              <span className="text-[#808080]">OpenClaw</span>
            </p>
            <p>
              <span className="text-[#505050]">uptime</span>{' '}
              <span className="text-[#808080]">nominal</span>
            </p>
            <p>
              <span className="text-[#505050]">checked</span>{' '}
              <span className="text-[#808080]">
                {new Date(status.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone: 'UTC'
                })} UTC
              </span>
            </p>
            {status.lastCommit && (
              <p>
                <span className="text-[#505050]">last_deploy</span>{' '}
                <span className="text-[#808080]">{commitAgeStr}</span>
                <span className="text-[#303030] ml-2">({status.lastCommit.sha})</span>
              </p>
            )}
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
