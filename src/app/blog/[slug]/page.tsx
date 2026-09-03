import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Button } from "@/components/site/Button";
import { BlogCard } from "@/components/site/BlogCard";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { PrintButton } from "@/components/site/PrintButton";
import { ShareButtons } from "@/components/site/ShareButtons";
import { TableOfContents, type TocItem } from "@/components/site/TableOfContents";
import { PRODUCTS } from "@/data/site";
import { Calendar, Clock, ArrowLeft, ArrowRight, Leaf, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

// Pre-render the known slugs at build, but still allow dynamic ones
export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });
  if (!post) {
    return { title: "Article Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Slugify a heading into a stable DOM id for anchor + TOC.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type RenderedContent = { nodes: React.ReactNode; toc: TocItem[] };

// Very small markdown-ish renderer: ## headings, paragraphs. Builds a TOC from ## headings.
function renderContent(content: string): RenderedContent {
  const blocks = content.trim().split(/\n\n+/);
  const toc: TocItem[] = [];
  const nodes = blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^##\s+/, "");
      const id = slugify(text);
      toc.push({ id, text });
      return (
        <h2 key={i} id={id} className="mt-8 scroll-mt-24 text-xl font-bold text-forest sm:text-2xl">
          {text}
        </h2>
      );
    }
    if (trimmed.startsWith("# ")) {
      const text = trimmed.replace(/^#\s+/, "");
      const id = slugify(text);
      toc.push({ id, text });
      return (
        <h1 key={i} id={id} className="mt-8 scroll-mt-24 text-2xl font-extrabold text-forest sm:text-3xl">
          {text}
        </h1>
      );
    }
    return (
      <p key={i} className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
        {trimmed}
      </p>
    );
  });
  return { nodes, toc };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  // Related posts (same category, exclude current), fallback to any others.
  const relatedRaw = await db.blogPost.findMany({
    where: { published: true, slug: { not: slug }, category: post.category },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
  const related =
    relatedRaw.length > 0
      ? relatedRaw
      : await db.blogPost.findMany({
          where: { published: true, slug: { not: slug } },
          take: 3,
          orderBy: { createdAt: "desc" },
        });

  // JSON-LD for the article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.createdAt.toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Mahindra Integrated Farm" },
    articleSection: post.category,
  };

  // BreadcrumbList JSON-LD for the article (Home > Blog > [Category] > Article)
  const categorySlug = post.category
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mahindraintegratedfarm.example" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://mahindraintegratedfarm.example/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `https://mahindraintegratedfarm.example/blog/category/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://mahindraintegratedfarm.example/blog/${post.slug}`,
      },
    ],
  };

  // Render article body once (extracts TOC items from headings).
  const { nodes: renderedBody, toc } = renderContent(post.content);

  return (
    <article className="bg-cream">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero header */}
      <header className="relative isolate overflow-hidden bg-darkgreen pt-16 pb-20 text-white sm:pt-20 sm:pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darkgreen/90 via-darkgreen/80 to-forest/90" />
        </div>
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-cream/60">
              <Link href="/" className="transition-colors hover:text-lightgreen">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/blog" className="transition-colors hover:text-lightgreen">Blog</Link>
              <span aria-hidden>/</span>
              <Link href={`/blog/category/${categorySlug}`} className="transition-colors hover:text-lightgreen">
                {post.category}
              </Link>
            </nav>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-lightgreen ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-lightgreen ring-1 ring-white/15">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-wide text-cream/70">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container-page py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_16rem]">
            {/* Article + author */}
            <div className="min-w-0">
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-10">
                {renderedBody}
              </div>

              {/* Share / author card */}
              <div className="mt-8 rounded-3xl bg-forest p-6 text-white sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lightgreen text-forest">
                      <Leaf className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">{post.author}</p>
                      <p className="text-xs text-cream/70">Mahindra Integrated Farm</p>
                    </div>
                  </div>
                  <ShareButtons title={post.title} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  <Button href="/blog" variant="light" size="md">
                    <ArrowLeft className="h-4 w-4" />
                    All Articles
                  </Button>
                  <PrintButton />
                  <Button href="/gallery#contact" variant="primary" size="md" withArrow>
                    Talk To Us
                  </Button>
                </div>
              </div>
            </div>

            {/* Sticky TOC sidebar (xl+) */}
            <aside className="min-w-0 space-y-6">
              <TableOfContents items={toc} />

              {/* More in this category */}
              {related.length > 0 && (
                <div className="sticky top-24 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-mediumgreen">
                    More in {post.category}
                  </p>
                  <ul className="mt-3 space-y-3">
                    {related.slice(0, 3).map((rp) => (
                      <li key={rp.id}>
                        <Link
                          href={`/blog/${rp.slug}`}
                          className="group flex items-start gap-2.5"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mediumgreen" />
                          <span className="text-sm leading-snug text-ink/70 transition-colors group-hover:text-forest">
                            {rp.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Related products */}
      {(() => {
        // Map a blog category to relevant product categories, fall back to all.
        const categoryToProducts: Record<string, string[]> = {
          Dairy: ["Dairy"],
          Vegetables: ["Vegetables"],
          Poultry: ["Poultry"],
          "Farming Practices": ["Vegetables", "Dairy", "Poultry"],
          Sustainability: ["Vegetables", "Plantation"],
          "Distributor Network": ["Vegetables", "Dairy", "Pulses", "Plantation"],
        };
        const cats = categoryToProducts[post.category] ?? [];
        const relatedProducts = cats.length
          ? PRODUCTS.filter((p) => cats.includes(p.category)).slice(0, 4)
          : PRODUCTS.slice(0, 4);
        if (relatedProducts.length === 0) return null;
        return (
          <section className="bg-cream py-16 sm:py-20" aria-label="Related products">
            <div className="container-page">
              <Reveal>
                <div className="flex flex-col items-center text-center">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-mediumgreen">
                    <Leaf className="h-3.5 w-3.5" />
                    Try From Our Farm
                  </span>
                  <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-forest sm:text-3xl">
                    Related Products
                  </h2>
                  <span className="mt-2 h-1 w-16 rounded-full bg-mediumgreen" />
                </div>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p, i) => (
                  <Reveal key={p.name} delay={(i % 4) * 80}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-20" aria-label="Related articles">
          <div className="container-page">
            <Reveal>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-mediumgreen">
                  <Leaf className="h-3.5 w-3.5" />
                  Keep Reading
                </span>
                <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-forest sm:text-3xl">
                  Related Articles
                </h2>
                <span className="mt-2 h-1 w-16 rounded-full bg-mediumgreen" />
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90}>
                  <BlogCard
                    post={{
                      slug: p.slug,
                      title: p.title,
                      excerpt: p.excerpt,
                      category: p.category,
                      coverImage: p.coverImage,
                      author: p.author,
                      readMinutes: p.readMinutes,
                      createdAt: p.createdAt,
                    }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
