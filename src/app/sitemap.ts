import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/site";

const BASE = "https://mahindraintegratedfarm.example";

const CATEGORY_SLUGS = [
  "sustainability",
  "farming-practices",
  "dairy",
  "vegetables",
  "poultry",
  "distributor-network",
];

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/careers",
    "/contact",
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

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.filter((p) => p.published).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
