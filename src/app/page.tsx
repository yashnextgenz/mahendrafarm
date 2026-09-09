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
import {
  ACTIVITIES,
  PRODUCTS,
  HERO_IMAGE,
  WHY_CHOOSE_IMAGE,
  WHY_CHOOSE_POINTS,
  STATS,
  SITE,
  BLOG_POSTS,
} from "@/data/site";
import { ArrowRight, CheckCircle2, Phone, Sprout, Leaf, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const featuredActivities = ACTIVITIES.slice(0, 12);
  const featuredProducts = PRODUCTS.slice(0, 5);

  // Latest 3 blog posts for the blog teaser (static data)
  const latestPosts = BLOG_POSTS.filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
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

  return (
    <>
      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative overflow-hidden  pt-6 sm:pt-8" aria-label="Hero">
        <div className="container-page">
          <div className="relative grid grid-cols-1 items-center gap-8 pb-16 sm:pb-20 lg:grid-cols-2 lg:gap-12 lg:pb-28">
            {/* Left text */}
            <div className="relative z-10 max-w-xl pt-6 sm:pt-8">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-mediumgreen">
             
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
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-[5/5] lg:aspect-[5/5]">
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
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3  lg:block"
              />
              {/* Floating badge */}
             
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: FEATURE STRIP (overlaps hero) ============ */}
     

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
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ">
               
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
           
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5b: STATS BAND ============ */}


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



      {/* ============ SECTION 6: DISTRIBUTOR CTA ============ */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Become a distributor">
        <CTASection />
      </section>
    </>
  );
}
