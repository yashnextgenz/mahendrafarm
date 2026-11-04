import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { BlogCard } from "@/components/site/BlogCard";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/site/Button";
import { BLOG_HERO_IMAGE, BLOG_POSTS } from "@/data/site";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";

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

export function generateStaticParams() {
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

  const posts = BLOG_POSTS.filter((p) => p.published && p.category === category).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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

  // BreadcrumbList JSON-LD (Home > Blog > [Category])
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mahindraintegratedfarm.example" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://mahindraintegratedfarm.example/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${category} Articles`,
        item: `https://mahindraintegratedfarm.example/blog/category/${cat}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero
        eyebrow="Category"
        title={`${category} Articles`}
        subtitle={`Browse all our stories and guides in the ${category} category.`}
        image={BLOG_HERO_IMAGE}
      />

      <section className="bg-cream py-20 sm:py-24" aria-label={`Articles in ${category}`}>
        <div className="container-page">
          {/* Breadcrumb + back link */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/50">
              <Link href="/" className="transition-colors hover:text-forest">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/blog" className="transition-colors hover:text-forest">Blog</Link>
              <span aria-hidden>/</span>
              <span className="font-semibold text-forest">{category}</span>
            </nav>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-colors hover:bg-lightgreen"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Articles
            </Link>
          </div>
          <p className="mb-8 text-sm text-ink/60">
            <span className="font-semibold text-forest">{posts.length}</span> article
            {posts.length !== 1 && "s"} in this category
          </p>

          {posts.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-10 text-center sm:p-12 shadow-soft ring-1 ring-black/5">
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
