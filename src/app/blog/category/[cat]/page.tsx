import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHero } from "@/components/site/PageHero";
import { BlogCard } from "@/components/site/BlogCard";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/site/Button";
import { BLOG_HERO_IMAGE } from "@/data/site";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";

export const dynamic = "force-dynamic";

type Params = Promise<{ cat: string }>;

// Known category slugs (lowercase, hyphenated) → display names.
const CATEGORY_SLUGS: Record<string, string> = {
  sustainability: "Sustainability",
  "farming-practices": "Farming Practices",
  dairy: "Dairy",
  vegetables: "Vegetables",
  poultry: "Poultry",
  "distributor-network": "Distributor Network",
};

// Inverse lookup: category name → slug
const TO_SLUG: Record<string, string> = Object.entries(CATEGORY_SLUGS).reduce(
  (acc, [slug, name]) => {
    acc[name] = slug;
    return acc;
  },
  {} as Record<string, string>
);

export async function generateStaticParams() {
  return Object.keys(CATEGORY_SLUGS).map((slug) => ({ cat: slug }));
}

function resolveCategory(slug: string): string | null {
  return CATEGORY_SLUGS[slug] ?? null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { cat } = await params;
  const category = resolveCategory(cat);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category} Articles`,
    description: `Browse all articles in the ${category} category from Mahindra Integrated Farm — natural farming, sustainable agriculture and farm life.`,
    openGraph: {
      title: `${category} Articles | Mahindra Integrated Farm`,
      description: `Stories and guides in the ${category} category.`,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Params }) {
  const { cat } = await params;
  const category = resolveCategory(cat);
  if (!category) notFound();

  const posts = await db.blogPost.findMany({
    where: { published: true, category },
    orderBy: { createdAt: "desc" },
  });

  const plainPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    coverImage: p.coverImage,
    author: p.author,
    readMinutes: p.readMinutes,
    createdAt: p.createdAt,
  }));

  return (
    <>
      <PageHero
        eyebrow="Category"
        title={`${category} Articles`}
        subtitle={`Browse all our stories and guides in the ${category} category.`}
        image={BLOG_HERO_IMAGE}
      />

      <section className="bg-cream py-20 sm:py-24" aria-label={`Articles in ${category}`}>
        <div className="container-page">
          {/* Breadcrumb + back link */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-colors hover:bg-lightgreen"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Articles
            </Link>
            <p className="text-sm text-ink/60">
              <span className="font-semibold text-forest">{posts.length}</span> article
              {posts.length !== 1 && "s"} in this category
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-soft ring-1 ring-black/5">
              <Leaf className="mx-auto h-10 w-10 text-ink/30" />
              <p className="mt-3 text-lg font-semibold text-forest">
                No articles in this category yet.
              </p>
              <p className="mt-1 text-sm text-ink/60">
                Please check back soon — we publish regularly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plainPosts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 90}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}

          {/* Other categories */}
          <div className="mt-16 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-8">
            <h2 className="text-center text-lg font-bold uppercase tracking-wide text-forest">
              Explore Other Categories
            </h2>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {Object.entries(CATEGORY_SLUGS).map(([slug, name]) => {
                const active = slug === cat;
                return (
                  <Link
                    key={slug}
                    href={`/blog/category/${slug}`}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
                        : "inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-4 py-2 text-xs font-bold uppercase tracking-wide text-forest transition-colors hover:bg-forest hover:text-white"
                    }
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
