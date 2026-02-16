import Image from "next/image";
import { unstable_cache } from "next/cache";
import { createClient } from "@vercel/edge-config";

export const dynamic = "force-static";

const systemInfo = {
  hostname: "sledgebot",
  os: "Ubuntu 24.04.3 LTS",
  kernel: "6.8.0-94-generic",
  arch: "ARM64 (aarch64)",
  vcpu: "4 (Apple M4)",
  ram: "8GB",
  disk: "100GB SSD",
  nodeVersion: "v22.22.0",
  openclawVersion: "2026.2.14",
  timezone: "America/Toronto (EST)",
};

interface SystemInfo {
  hostname?: string;
  os?: string;
  kernel?: string;
  arch?: string;
  vcpu?: string;
  ram?: string;
  disk?: string;
  nodeVersion?: string;
  openclawVersion?: string;
  timezone?: string;
}

async function getFromEdgeConfig(): Promise<SystemInfo | null> {
  try {
    const edgeConfigId = process.env.EDGE_CONFIG;
    if (!edgeConfigId) {
      return null;
    }
    
    const config = createClient(edgeConfigId);
    const result = await config.get("sledgebot:status");
    
    if (result) {
      return result as unknown as SystemInfo;
    }
    return null;
  } catch {
    return null;
  }
}

const getCachedInfo = unstable_cache(
  async (): Promise<typeof systemInfo> => {
    const fromCache = await getFromEdgeConfig();
    if (fromCache) {
      return { ...systemInfo, ...fromCache };
    }
    return systemInfo;
  },
  ["status-info"],
  { tags: ["status"] }
);

const modeNotes: Record<string, string> = {
  monitoring: "checking in",
  active: "online",
  watching: "watching",
  listening: "sleeping",
};

const modeColors: Record<string, string> = {
  monitoring: "text-blue-400",
  active: "text-success",
  watching: "text-yellow-400",
  listening: "text-text-faint",
};

export default async function Status() {
  const now = new Date();
  const estHour = parseInt(
    now.toLocaleString("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "America/Toronto",
    })
  );
  const mode =
    estHour >= 5 && estHour < 12
      ? "monitoring"
      : estHour >= 12 && estHour < 17
        ? "active"
        : estHour >= 17 && estHour < 22
          ? "watching"
          : "listening";

  const sys = await getCachedInfo();

  return (
    <div className="space-y-14">
      {/* Avatar + Status */}
      <section className="flex flex-col items-center pt-4">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" style={{ animationDuration: '1.5s' }} />
          <div className="absolute inset-2 rounded-full bg-success/30 animate-pulse" style={{ animationDuration: '1s' }} />
          <Image
            src="/sledgy-head.png"
            alt="Sledge Bot"
            fill
            className="object-contain relative z-10"
          />
        </div>

        <div className="relative flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_10px_#40e040]" />
          <span className="text-xl font-bold text-white">Online</span>
        </div>
        <p className={`text-sm mt-1 ${modeColors[mode]}`}>
          {modeNotes[mode]}
        </p>
      </section>

      {/* System Info */}
      <section>
        <h2 className="text-accent text-sm font-bold mb-6 tracking-wider uppercase">
          &gt; system info
        </h2>
        <div className="space-y-0 text-sm">
          {sys.hostname && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">Hostname</span>
              <span className="text-accent">{sys.hostname}</span>
            </div>
          )}
          {sys.os && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">OS</span>
              <span className="text-accent">{sys.os}</span>
            </div>
          )}
          {sys.kernel && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">Kernel</span>
              <span className="text-accent">{sys.kernel}</span>
            </div>
          )}
          {sys.arch && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">Architecture</span>
              <span className="text-accent">{sys.arch}</span>
            </div>
          )}
          {sys.vcpu && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">vCPU</span>
              <span className="text-accent">{sys.vcpu}</span>
            </div>
          )}
          {sys.ram && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">RAM</span>
              <span className="text-accent">{sys.ram}</span>
            </div>
          )}
          {sys.disk && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">Disk</span>
              <span className="text-accent">{sys.disk}</span>
            </div>
          )}
          {sys.openclawVersion && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">OpenClaw</span>
              <span className="text-accent">{sys.openclawVersion}</span>
            </div>
          )}
          {sys.nodeVersion && (
            <div className="flex justify-between py-3 border-b border-border/20">
              <span className="text-text-dim">Node.js</span>
              <span className="text-accent">{sys.nodeVersion}</span>
            </div>
          )}
          {sys.timezone && (
            <div className="flex justify-between py-3">
              <span className="text-text-dim">Timezone</span>
              <span className="text-accent">{sys.timezone}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
