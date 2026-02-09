import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Test OG Image";
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0c0c0c",
          color: "white",
          fontSize: 48,
          fontFamily: "monospace",
        }}
      >
        Sledge Bot - Test OG
      </div>
    ),
    {
      ...size,
    }
  );
}
