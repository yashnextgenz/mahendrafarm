import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/site/Button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ActivityCard } from "@/components/site/ActivityCard";
import { ProductCard } from "@/components/site/ProductCard";
import { FeatureStrip } from "@/components/site/FeatureStrip";
import { CTASection } from "@/components/site/CTASection";
import { Testimonials } from "@/components/site/Testimonials";
import { BlogCard } from "@/components/site/BlogCard";
import { Reveal } from "@/components/site/Reveal";
import { db } from "@/lib/db";
import {
  ACTIVITIES,
  PRODUCTS,
  HERO_IMAGE,
  WHY_CHOOSE_IMAGE,
  WHY_CHOOSE_POINTS,
  STATS,
  SITE,
} from "@/data/site";
import { ArrowRight, CheckCircle2, Phone, Sprout, Leaf, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredActivities = ACTIVITIES.slice(0, 12);
  const featuredProducts = PRODUCTS.slice(0, 5);

  // Latest 3 blog posts for the blog teaser
  let latestPosts: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverImage: string;
    author: string;
    readMinutes: number;
    createdAt: Date;
  }[] = [];
  try {
    latestPosts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        coverImage: true,
        author: true,
        readMinutes: true,
        createdAt: true,
      },
    });
  } catch {
    latestPosts = [];
  }

  return (
    <>
      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative overflow-hidden bg-cream pt-6 sm:pt-8" aria-label="Hero">
        <div className="container-page">
          <div className="relative grid grid-cols-1 items-center gap-8 pb-16 sm:pb-20 lg:grid-cols-2 lg:gap-12 lg:pb-28">
            {/* Left text */}
            <div className="relative z-10 max-w-xl pt-6 sm:pt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-lightgreen px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-mediumgreen">
                <Leaf className="h-3.5 w-3.5" />
                Growing Naturally, Serving Honestly
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-forest sm:text-5xl lg:text-6xl">
                SUSTAINABLE FARMS
                <span className="block text-mediumgreen">FOR A BETTER FUTURE</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
                Mahindra Integrated Farm is committed to natural farming practices,
                offering fresh produce, livestock, and plantation products for a
                healthier tomorrow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/farming-activities" size="lg" withArrow>
                  Explore Our Farms
                </Button>
                <Button href="/gallery#contact" variant="outline" size="lg">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </Button>
              </div>

              {/* Mini trust row */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-ink/60">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-mediumgreen" /> 100% Natural
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sprout className="h-4 w-4 text-mediumgreen" /> Eco-Friendly
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-mediumgreen" /> Farm Fresh
                </span>
              </div>
            </div>

            {/* Right image with soft left fade */}
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]">
                <Image
                  src={HERO_IMAGE}
                  alt="Freshly harvested vegetables in a basket from a green farm"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Soft fade into background on the left */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-cream to-transparent lg:block"
              />
              {/* Floating badge */}
              <div className="absolute -left-3 bottom-6 hidden rounded-2xl bg-white px-4 py-3 shadow-float sm:block lg:-left-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lightgreen text-forest">
                    <Sprout className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-forest">Since 2015</p>
                    <p className="text-xs text-ink/60">Growing naturally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: FEATURE STRIP (overlaps hero) ============ */}
      <FeatureStrip className="-mt-4 sm:-mt-6" />

      {/* ============ SECTION 3: FARMING ACTIVITIES ============ */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Our farming activities">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Farming Activities"
            subtitle="Diverse Farming for a Sustainable Future"
          />
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-6">
            {featuredActivities.map((act) => (
              <Link key={act.name} href="/farming-activities" className="block">
                <ActivityCard activity={act} />
              </Link>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button href="/farming-activities" variant="primary" size="lg" withArrow>
              View All Activities
            </Button>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: PRODUCTS ============ */}
      <section className="bg-white py-20 sm:py-24" aria-label="Our products">
        <div className="container-page">
          <SectionHeading
            eyebrow="From Our Farms"
            title="Our Products"
            subtitle="Farm Fresh Products for Healthy Living"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button href="/products" variant="outline" size="lg" withArrow>
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: WHY CHOOSE US ============ */}
      <section className="relative overflow-hidden bg-forest py-20 sm:py-24" aria-label="Why choose us">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mediumgreen/20 blur-3xl"
        />
        <div className="container-page relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15">
                <Leaf className="h-3.5 w-3.5" />
                Why Mahindra Integrated Farm
              </span>
              <h2 className="mt-5 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                Why Choose Us?
              </h2>
              <span className="mt-3 block h-1 w-16 rounded-full bg-mediumgreen" />
              <ul className="mt-8 space-y-4">
                {WHY_CHOOSE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-lightgreen" strokeWidth={2} />
                    <span className="text-base text-cream/90 sm:text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Button href="/about" variant="light" size="lg" withArrow>
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Right image with organic leaf-shaped mask */}
            <div className="relative mx-auto w-full max-w-lg">
              <div
                className="relative aspect-square w-full"
                style={{
                  clipPath:
                    "polygon(50% 0%, 80% 10%, 100% 35%, 95% 70%, 75% 95%, 50% 100%, 25% 95%, 5% 70%, 0% 35%, 20% 10%)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={WHY_CHOOSE_IMAGE}
                    alt="Farmer working in a lush green field"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Decorative ring */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 m-[-6%] rounded-full border-2 border-dashed border-lightgreen/30"
              />
              <div
                aria-hidden
                className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full bg-lightgreen text-forest shadow-float"
              >
                <Leaf className="h-9 w-9" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5b: STATS BAND ============ */}
      <section className="bg-white py-16 sm:py-20" aria-label="Our farm in numbers">
        <div className="container-page">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 rounded-3xl bg-cream px-6 py-10 ring-1 ring-mediumgreen/15 sm:px-10 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <span className="text-4xl font-extrabold tracking-tight text-forest sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-ink/70 sm:text-sm">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SECTION 5c: TESTIMONIALS ============ */}
      <section className="bg-cream py-20 sm:py-24" aria-label="What our customers say">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Loved By Families & Partners"
              title="What Our Customers Say"
              subtitle="Real stories from households, restaurants and distributors who trust Mahindra Integrated Farm."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* ============ SECTION 5d: BLOG TEASER ============ */}
      {latestPosts.length > 0 && (
        <section className="bg-white py-20 sm:py-24" aria-label="Latest from the farm journal">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="From The Farm Journal"
                title="Latest From Our Blog"
                subtitle="Guides, stories and honest notes on natural farming and seasonal produce."
              />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 90}>
                  <BlogCard
                    post={{
                      slug: post.slug,
                      title: post.title,
                      excerpt: post.excerpt,
                      category: post.category,
                      coverImage: post.coverImage,
                      author: post.author,
                      readMinutes: post.readMinutes,
                      createdAt: post.createdAt,
                    }}
                  />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button href="/blog" variant="outline" size="lg" withArrow>
                Read All Articles
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ============ SECTION 6: DISTRIBUTOR CTA ============ */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Become a distributor">
        <CTASection />
      </section>
    </>
  );
}
