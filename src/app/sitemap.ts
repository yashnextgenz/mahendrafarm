import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE = "https://mahindraintegratedfarm.example";

export const dynamic = "force-dynamic";

const CATEGORY_SLUGS = [
  "sustainability",
  "farming-practices",
  "dairy",
  "vegetables",
  "poultry",
  "distributor-network",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/farming-activities",
    "/products",
    "/gallery",
    "/blog",
    "/distributor",
    "/search",
    "/privacy",
    "/faq",
    "/site-map",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
  } catch {
    return [...staticRoutes, ...categoryRoutes];
  }
}
