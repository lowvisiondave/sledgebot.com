import { Metadata } from "next";
import Image from "next/image";

export const revalidate = 60; // 1 minute

export const metadata: Metadata = {
  title: "Status",
  description: "System status — Sledge Bot & Claw",
};

type FamiliarStatus = {
  name: string;
  emoji: string;
  status: "online" | "offline";
  tagline: string;
};

async function getSledgyStatus(): Promise<"online" | "offline"> {
  try {
    const response = await fetch("https://hc-ping.com/17d2c4da-710c-4bb4-a0df-804c255e3fbe", {
      next: { revalidate: 60 },
    });
    return response.ok ? "online" : "offline";
  } catch {
    return "offline";
  }
}

async function getClawStatus(): Promise<"online" | "offline"> {
  // TODO: Add Claw's healthcheck endpoint
  // For now, assume online if Sledgy is online (same machine)
  return "online";
}

function StatusCard({ familiar }: { familiar: FamiliarStatus }) {
  const isOnline = familiar.status === "online";
  
  return (
    <div className="flex flex-col items-center p-6 border border-accent/20 rounded-lg">
      {/* Status indicator with emoji */}
      <div className="relative w-24 h-24 mb-4">
        {isOnline ? (
          <>
            <div 
              className="absolute inset-0 rounded-full bg-success/20 animate-ping" 
              style={{ animationDuration: '3s' }} 
            />
            <div 
              className="absolute inset-2 rounded-full bg-success/30 animate-pulse" 
              style={{ animationDuration: '2s' }} 
            />
            <div className="absolute inset-3 rounded-full bg-success/40 flex items-center justify-center">
              <span className="text-4xl">{familiar.emoji}</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 rounded-full bg-red-900/30 animate-pulse flex items-center justify-center">
            <span className="text-4xl opacity-50">{familiar.emoji}</span>
          </div>
        )}
      </div>

      {/* Name and status */}
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success shadow-[0_0_8px_#40e040]' : 'bg-red-600'}`} />
        <span className="text-lg font-bold text-foreground">{familiar.name}</span>
      </div>
      
      <p className="text-text-dim text-sm">
        {isOnline ? familiar.tagline : "Offline"}
      </p>
    </div>
  );
}

export default async function StatusPage() {
  const [sledgyStatus, clawStatus] = await Promise.all([
    getSledgyStatus(),
    getClawStatus(),
  ]);

  const familiars: FamiliarStatus[] = [
    {
      name: "Sledge Bot",
      emoji: "🤖",
      status: sledgyStatus,
      tagline: "Quiet. Loyal. Pinging.",
    },
    {
      name: "Claw",
      emoji: "🦞",
      status: clawStatus,
      tagline: "Direct. Resourceful. Ready.",
    },
  ];

  const allOnline = familiars.every(f => f.status === "online");
  const anyOnline = familiars.some(f => f.status === "online");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Overall status banner */}
      <div className={`px-4 py-2 rounded-full mb-8 ${
        allOnline 
          ? "bg-success/20 text-success" 
          : anyOnline 
            ? "bg-yellow-600/20 text-yellow-500"
            : "bg-red-600/20 text-red-500"
      }`}>
        {allOnline 
          ? "All systems operational" 
          : anyOnline 
            ? "Partial availability"
            : "Systems offline"}
      </div>

      {/* Side-by-side status cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {familiars.map((familiar) => (
          <StatusCard key={familiar.name} familiar={familiar} />
        ))}
      </div>

      <p className="text-text-dim text-xs mt-8">
        Updates every minute
      </p>
    </div>
  );
}
