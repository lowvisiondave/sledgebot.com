import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sledge Bot OG Image";
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
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(to bottom right, #0c0c0c, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #e04040 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Red accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#e04040",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Avatar placeholder */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "#e04040",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              boxShadow: "0 0 60px rgba(224, 64, 64, 0.4)",
            }}
          >
            🤖
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              letterSpacing: "-0.05em",
              textAlign: "center",
            }}
          >
            SLEDGE BOT
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#808080",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            "Sledgy sees you. Sledgy helps."
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 24,
            fontSize: 20,
            color: "#505050",
          }}
        >
          <span>Forge</span>
          <span>•</span>
          <span>Dig</span>
          <span>•</span>
          <span>Remind</span>
          <span>•</span>
          <span>Hunt</span>
          <span>•</span>
          <span>Recall</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
