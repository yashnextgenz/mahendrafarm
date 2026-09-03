import { ImageResponse } from "next/og";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const alt = "Mahindra Integrated Farm — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "Blog & Insights";
  let category = "Mahindra Integrated Farm";
  let excerpt = "Stories from the farm";

  try {
    const post = await db.blogPost.findUnique({ where: { slug } });
    if (post) {
      title = post.title;
      category = post.category;
      excerpt = post.excerpt.slice(0, 120) + (post.excerpt.length > 120 ? "…" : "");
    }
  } catch {
    /* fall back to defaults */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0F3D1B 0%, #164D24 60%, #2F7D32 100%)",
          color: "#F5F9E9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#DFF0C8",
              color: "#164D24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            🌿
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 1 }}>MAHINDRA INTEGRATED FARM</div>
            <div style={{ fontSize: 18, color: "#DFF0C8", letterSpacing: 3, textTransform: "uppercase" }}>
              Natural Farming, Better Living
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(223,240,200,0.18)",
              border: "1px solid rgba(223,240,200,0.35)",
              fontSize: 20,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#DFF0C8",
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.12,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, color: "rgba(245,249,233,0.8)", maxWidth: 1000, lineHeight: 1.4 }}>
            {excerpt}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, color: "rgba(245,249,233,0.7)" }}>
          <div>mahindraintegratedfarm.example/blog</div>
          <div>Farm Fresh · Naturally Grown</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
