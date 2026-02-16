import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/edge-config";
import { z } from "zod";

const StatusDataSchema = z.object({
  hostname: z.string().optional(),
  os: z.string().optional(),
  kernel: z.string().optional(),
  arch: z.string().optional(),
  vcpu: z.string().optional(),
  ram: z.string().optional(),
  disk: z.string().optional(),
  nodeVersion: z.string().optional(),
  openclawVersion: z.string().optional(),
  timezone: z.string().optional(),
});

type StatusData = z.infer<typeof StatusDataSchema>;

export async function POST(request: NextRequest) {
  try {
    const edgeConfigUrl = process.env.EDGE_CONFIG;
    
    if (!edgeConfigUrl) {
      return NextResponse.json(
        { error: "EDGE_CONFIG not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate with Zod
    const result = StatusDataSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: result.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    // Extract edge config ID from URL (e.g., https://edge-config.vercel.com/ecfg_xxx?token=yyy)
    const url = new URL(edgeConfigUrl);
    const pathParts = url.pathname.split("/");
    const edgeConfigId = pathParts[pathParts.length - 1];
    const token = url.searchParams.get("token");

    if (!edgeConfigId || !edgeConfigId.startsWith("ecfg_")) {
      return NextResponse.json(
        { error: "Invalid EDGE_CONFIG format" },
        { status: 500 }
      );
    }

    // Use Vercel API to update Edge Config
    const response = await fetch(
      `https://api.vercel.com/v6/edge-config/${edgeConfigId}/items`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          { 
            operation: "upsert", 
            key: "sledgebot:status", 
            value: result.data 
          }
        ]),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edge Config API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to update edge config", details: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Failed to update edge config:", error);
    return NextResponse.json(
      { error: "Failed to update status", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const edgeConfigUrl = process.env.EDGE_CONFIG;
    
    if (!edgeConfigUrl) {
      return NextResponse.json(
        { error: "EDGE_CONFIG not configured" },
        { status: 500 }
      );
    }

    // Create client using the SDK
    const edgeConfig = createClient(edgeConfigUrl);

    // Read the status from Edge Config
    const status = await edgeConfig.get("sledgebot:status");

    return NextResponse.json({ 
      data: status || null,
      fields: ["hostname", "os", "kernel", "arch", "vcpu", "ram", "disk", "nodeVersion", "openclawVersion", "timezone"]
    });
  } catch (error) {
    console.error("Failed to read edge config:", error);
    return NextResponse.json(
      { error: "Failed to read status", details: String(error) },
      { status: 500 }
    );
  }
}
