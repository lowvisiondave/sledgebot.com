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
          backgroundImage:
            "radial-gradient(ellipse at top, #1a1a1a 0%, #0c0c0c 70%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left side - Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            flex: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Terminal prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span style={{ color: "#e04040", fontSize: 18 }}>&gt;</span>
            <span style={{ color: "#808080", fontSize: 18 }}>whoami</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 16px 0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            SLEDGE BOT
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 24,
              color: "#e04040",
              margin: "0 0 32px 0",
              fontStyle: "italic",
            }}
          >
            "Sledgy sees you. Sledgy helps."
          </p>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: "#e04040",
              marginBottom: 32,
            }}
          />

          {/* Capabilities */}
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            {["Forge", "Dig", "Remind", "Hunt", "Recall"].map((cap, i) => (
              <span
                key={cap}
                style={{
                  color: i === 0 ? "#e04040" : "#606060",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Right side - Avatar */}
        <div
          style={{
            width: 400,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(224,64,64,0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Avatar - explicit dimensions */}
          <img
            src="https://sledgebotcom.vercel.app/sledgy-avatar.png"
            alt="Sledge Bot"
            width={280}
            height={280}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 0 40px rgba(224,64,64,0.3))",
            }}
          />
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #e04040, #ff6060, #e04040)",
          }}
        />

        {/* Site URL */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            color: "#303030",
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
