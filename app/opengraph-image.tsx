import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sledge Bot - Digital Familiar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          backgroundColor: "#0c0c0c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Left side - Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 650,
          }}
        >
          {/* Terminal prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "#e04040", fontSize: 20, marginRight: 12 }}>&gt;</span>
            <span style={{ color: "#808080", fontSize: 20 }}>whoami</span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            SLEDGE BOT
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: "#808080",
              marginBottom: 32,
            }}
          >
            "Sledgy sees you. Sledgy helps."
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              color: "#a0a0a0",
              lineHeight: 1.5,
            }}
          >
            Digital familiar. Assistant. Hired gun.
          </div>
        </div>

        {/* Right side - Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://sledgebot.com/sledgy-avatar.png"
            alt="Sledge Bot"
            width={320}
            height={320}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#e04040",
          }}
        />

        {/* Site URL - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 80,
            color: "#404040",
            fontSize: 14,
          }}
        >
          sledgebot.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
