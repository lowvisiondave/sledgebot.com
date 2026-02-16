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

    // Use SDK to set the status
    const edgeConfig = createClient(edgeConfigUrl);
    await edgeConfig.set("sledgebot-status", result.data);

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
    const status = await edgeConfig.get("sledgebot-status");

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
