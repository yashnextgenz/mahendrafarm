import { NextResponse } from "next/server";
import { ACTIVITIES, PRODUCTS, BLOG_POSTS } from "@/data/site";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim().toLowerCase() ?? "";

  if (q.length < 2) {
    return NextResponse.json({
      ok: true,
      query: q,
      results: { blog: [], products: [], activities: [] },
      total: 0,
    });
  }

  // Blog posts from static data
  const blog = BLOG_POSTS.filter((p) => {
    if (!p.published) return false;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  })
    .slice(0, 8)
    .map((p) => ({
      type: "blog" as const,
      title: p.title,
      excerpt: p.excerpt,
      href: `/blog/${p.slug}`,
      category: p.category,
    }));

  // Products from static data
  const products = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
    .slice(0, 8)
    .map((p) => ({
      type: "product" as const,
      title: p.name,
      excerpt: p.description,
      href: "/products",
      category: p.category,
    }));

  // Activities from static data
  const activities = ACTIVITIES.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
  )
    .slice(0, 6)
    .map((a) => ({
      type: "activity" as const,
      title: a.name,
      excerpt: a.description,
      href: "/farming-activities",
      category: "Farming Activity",
    }));

  const total = blog.length + products.length + activities.length;

  return NextResponse.json({
    ok: true,
    query: q,
    results: { blog, products, activities },
    total,
  });
}
