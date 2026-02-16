import { createClient } from "@vercel/edge-config";

const edgeConfigId = "ecfg_vlojrnjg4pcwpd8urh461jn4v2ka";
const config = createClient(edgeConfigId);

const status = {
  hostname: "sledgebot",
  openclawVersion: "2026.2.16",
  kernel: "6.8.0",
  arch: "arm64",
  nodeVersion: "v22.22.0",
  timezone: "America/Toronto"
};

await config.set("sledgebot:status", status);
console.log("Updated:", status);
