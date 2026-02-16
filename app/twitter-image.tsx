import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Sledge Bot - Digital Familiar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const avatarData = await readFile(join(process.cwd(), "public", "sledgy-body.png"));
  const avatarBase64 = `data:image/png;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "50px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Terminal-style grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "linear-gradient(rgba(50, 50, 50, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(50, 50, 50, 0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Scanline effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 51%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Avatar glow - behind avatar */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 60,
            width: 500,
            height: 500,
            marginTop: -250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224, 64, 64, 0.6) 0%, rgba(224, 64, 64, 0.4) 25%, rgba(224, 64, 64, 0.2) 45%, transparent 65%)",
            zIndex: 0,
          }}
        />

        {/* Border around whole image */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "2px solid #e04040",
            zIndex: 3,
          }}
        />

        {/* Left side - Terminal content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 650,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Terminal prompt line */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: 32,
              fontSize: 20,
              color: "#e04040",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            <span style={{ marginRight: 12 }}>$</span>
            <span style={{ color: "#808080" }}>whoami</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            SLEDGE BOT
          </div>

          {/* Primary tagline */}
          <div
            style={{
              fontSize: 32,
              color: "#e04040",
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            "Sledgy sees you. Sledgy helps."
          </div>

          {/* Secondary tagline */}
          <div
            style={{
              fontSize: 20,
              color: "#505050",
              fontStyle: "italic",
            }}
          >
            Digital Familiar, Assistant, Hired Gun
          </div>

          {/* Blinking cursor */}
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: "#ffffff",
              animation: "blink 1s step-end infinite",
            }}
          >
            _
          </div>
        </div>

        {/* Right side - Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <img
            src={avatarBase64}
            alt="Sledge Bot"
            width={360}
            height={360}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 0 25px rgba(224, 64, 64, 0.5))",
            }}
          />
        </div>

        {/* Version indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 80,
            color: "#505050",
            fontSize: 14,
          }}
        >
          v2.0
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
