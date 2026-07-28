import { ImageResponse } from "next/og"

export const alt = "Diaspora Alive — an interactive map of the African diaspora"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b0b0d",
          backgroundImage: "radial-gradient(circle at 75% 30%, rgba(200,169,110,0.14), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "36px" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "#c8a96e" }} />
          <div
            style={{
              fontSize: 24,
              color: "#c8a96e",
              letterSpacing: 5,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Interactive Map
          </div>
        </div>

        <div style={{ fontSize: 88, color: "#f0f0f2", fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>
          Diaspora Alive
        </div>

        <div style={{ fontSize: 34, color: "#a0a0a8", marginTop: 30, maxWidth: 920, lineHeight: 1.4 }}>
          Trace the African diaspora across 19 countries — with an AI guide that curates journeys through the history.
        </div>
      </div>
    ),
    { ...size },
  )
}
