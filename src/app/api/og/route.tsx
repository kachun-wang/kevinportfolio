import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get parameters
  const title = searchParams.get("title") || "Kevin Chung";
  const subtitle =
    searchParams.get("subtitle") || "AI Engineer & Full-Stack Developer";
  const type = searchParams.get("type") || "default";

  // Load Inter font from Google Fonts
  const interBold = fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeAmM.woff2",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const interRegular = fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const [interBoldData, interRegularData] = await Promise.all([
    interBold,
    interRegular,
  ]);

  // Project-specific styles
  const isProject = type === "project";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
        position: "relative",
      }}
    >
      {/* Background gradient circles */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(139, 92, 246, 0.2)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <span
            style={{
              color: "rgba(192, 132, 252, 1)",
              fontSize: "18px",
              fontFamily: "Inter",
              fontWeight: 500,
            }}
          >
            {isProject ? "Project Case Study" : "Portfolio"}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: isProject ? "64px" : "80px",
            fontFamily: "Inter",
            fontWeight: 800,
            background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            fontFamily: "Inter",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "20px",
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </p>

        {/* Metrics bar for projects */}
        {isProject && (
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "40px",
            }}
          >
            {["+20% Accuracy", "Production AI", "Real Results"].map(
              (metric, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "18px",
                    fontFamily: "Inter",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background:
                        i === 0 ? "#a855f7" : i === 1 ? "#06b6d4" : "#10b981",
                    }}
                  />
                  {metric}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 700,
            color: "white",
            fontFamily: "Inter",
          }}
        >
          KC
        </div>
        <span
          style={{
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: "18px",
            fontFamily: "Inter",
          }}
        >
          kevinchung.dev
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interBoldData,
          style: "normal",
          weight: 800,
        },
        {
          name: "Inter",
          data: interRegularData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
