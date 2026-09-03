import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BlogCard } from "@/components/site/BlogCard";
import { BlogExplorer } from "@/components/site/BlogExplorer";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/site/Button";
import { BLOG_HERO_IMAGE } from "@/data/site";
import { ArrowRight, Calendar, Clock, Leaf, Flame, Tag, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Stories, guides and insights on natural farming, sustainable agriculture, seasonal produce and life at Mahindra Integrated Farm.",
};

// Always read fresh posts
export const dynamic = "force-dynamic";

function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const featured = posts.filter((p) => p.featured).slice(0, 1)[0] ?? posts[0];
  const explorerPosts = posts
    .filter((p) => p.id !== featured?.id)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      coverImage: p.coverImage,
      author: p.author,
      readMinutes: p.readMinutes,
      createdAt: p.createdAt,
    }));

  // "Popular" posts: featured ones first, then by readMinutes desc (longer = deeper reads).
  const popular = [...posts]
    .sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return b.readMinutes - a.readMinutes;
    })
    .slice(0, 5)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      readMinutes: p.readMinutes,
      createdAt: p.createdAt,
    }));

  return (
    <>
      <PageHero
        eyebrow="Stories From The Farm"
        title="Blog & Insights"
        subtitle="Guides, stories and honest notes on natural farming, seasonal produce and life at Mahindra Integrated Farm."
        image={BLOG_HERO_IMAGE}
      />

      {/* Featured post */}
      {featured && (
        <section className="bg-cream py-16 sm:py-20" aria-label="Featured article">
          <div className="container-page">
            <Reveal>
              <article className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 lg:grid-cols-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:min-h-[22rem]"
                >
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-forest/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur">
                    <Leaf className="h-3 w-3" />
                    Featured
                  </span>
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="inline-flex w-fit items-center rounded-full bg-lightgreen px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-mediumgreen">
                    {featured.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold leading-tight text-forest sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink/70">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-4 text-xs font-medium uppercase tracking-wide text-ink/50">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(featured.createdAt)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readMinutes} min read
                    </span>
                  </div>
                  <div className="mt-7">
                    <Button href={`/blog/${featured.slug}`} variant="primary" withArrow>
                      Read Article
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* All posts with search + filter */}
      <section className="bg-white py-20 sm:py-24" aria-label="All articles">
        <div className="container-page">
          <SectionHeading
            eyebrow="Latest Articles"
            title="Fresh From The Farm Journal"
            subtitle="Search or filter our stories on natural farming, seasonal produce, distributors and farm life."
          />
          <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[1fr_18rem]">
            <div className="min-w-0">
              <BlogExplorer posts={explorerPosts} />
            </div>

            {/* Popular posts sidebar (xl+) */}
            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-3xl bg-cream p-6 ring-1 ring-mediumgreen/15">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-mediumgreen" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-mediumgreen">
                    Popular Reads
                  </h3>
                </div>
                <ul className="mt-4 space-y-4">
                  {popular.map((p, i) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex items-start gap-3"
                      >
                        <span className="mt-0.5 text-2xl font-extrabold leading-none text-lightgreen">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-forest transition-colors group-hover:text-mediumgreen">
                            {p.title}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-ink/40">
                            <span className="inline-flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {p.category}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {p.readMinutes} min
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-border pt-4">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-mediumgreen transition-colors hover:text-forest"
                  >
                    <Search className="h-3.5 w-3.5" />
                    Search all articles
                  </Link>
                </div>

                {/* Popular tags cloud */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/40">
                    Browse by category
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[...new Set(posts.map((p) => p.category))].map((cat) => {
                      const slug = cat
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, "")
                        .trim()
                        .replace(/\s+/g, "-");
                      return (
                        <Link
                          key={cat}
                          href={`/blog/category/${slug}`}
                          className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-forest ring-1 ring-mediumgreen/20 transition-colors hover:bg-forest hover:text-white"
                        >
                          {cat}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 rounded-3xl bg-forest p-8 text-center text-white sm:p-12">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Never Miss A Farm Story</h3>
            <p className="mx-auto mt-3 max-w-xl text-cream/80">
              Subscribe to our newsletter for seasonal harvest updates, recipes and farming insights — once a month, no spam.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/#newsletter" variant="light" size="lg" withArrow>
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
