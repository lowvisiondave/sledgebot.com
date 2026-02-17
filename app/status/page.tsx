import { Metadata } from "next";
import Image from "next/image";

export const revalidate = 1800; // 30 minutes

export const metadata: Metadata = {
  title: "Status | Sledge Bot",
  description: "System status",
};

async function getHealthStatus(): Promise<{ status: "online" | "offline" }> {
  try {
    const response = await fetch("https://hc-ping.com/17d2c4da-710c-4bb4-a0df-804c255e3fbe", {
      next: { revalidate: 60 },
    });
    
    return response.ok
      ? { status: "online" }
      : { status: "offline" };
  } catch {
    return { status: "offline" };
  }
}

export default async function StatusPage() {
  const health = await getHealthStatus();
  const isOnline = health.status === "online";
  const uptime = "20h";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-48 h-48 mb-8">
        {isOnline ? (
          <>
            <div 
              className="absolute inset-0 rounded-full bg-success/20 animate-ping" 
              style={{ animationDuration: '3s' }} 
            />
            <div 
              className="absolute inset-3 rounded-full bg-success/30 animate-pulse" 
              style={{ animationDuration: '2s' }} 
            />
            <div className="absolute inset-4 rounded-full bg-success/50 flex items-center justify-center overflow-hidden">
              <Image
                src="/sledgy-head.png"
                alt="Sledge Bot"
                width={100}
                height={100}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 rounded-full bg-red-900/30 animate-pulse flex items-center justify-center overflow-hidden">
            <Image
              src="/sledgy-head.png"
              alt="Sledge Bot"
              width={100}
              height={100}
              className="max-w-full max-h-full object-contain opacity-50"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success shadow-[0_0_16px_#40e040]' : 'bg-red-600'}`} />
        <span className="text-2xl font-bold text-foreground">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <p className="text-text-dim text-sm mb-8">
        {isOnline ? "Still alive" : "Something's wrong"}
      </p>

      {isOnline && (
        <div className="flex items-center gap-3 text-sm text-text-dim">
          <span>{uptime} awake</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>pinging</span>
        </div>
      )}
    </div>
  );
}
