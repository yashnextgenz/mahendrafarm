import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ACTIVITIES, PRODUCTS } from "@/data/site";

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

  // Blog posts from DB
  let blog: {
    type: "blog";
    title: string;
    excerpt: string;
    href: string;
    category: string;
  }[] = [];
  try {
    const posts = await db.blogPost.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q } },
          { excerpt: { contains: q } },
          { content: { contains: q } },
          { category: { contains: q } },
        ],
      },
      take: 8,
      orderBy: { createdAt: "desc" },
      select: { slug: true, title: true, excerpt: true, category: true },
    });
    blog = posts.map((p) => ({
      type: "blog" as const,
      title: p.title,
      excerpt: p.excerpt,
      href: `/blog/${p.slug}`,
      category: p.category,
    }));
  } catch {
    blog = [];
  }

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
