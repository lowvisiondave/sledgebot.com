import { createClient } from "@vercel/edge-config";

const edgeConfigId = "ecfg_vlojrnjg4pcwpd8urh461jn4v2ka";
const config = createClient(edgeConfigId);

const status = {
  hostname: process.env.HOSTNAME || "sledgebot",
  openclawVersion: "2026.2.16",
  kernel: process.env.KERNEL || "6.8.0",
  arch: process.env.ARCH || "arm64",
  nodeVersion: process.version,
  timezone: "America/Toronto"
};

await config.set("sledgebot-status", status);
console.log("Updated edge config:", JSON.stringify(status, null, 2));
