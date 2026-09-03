import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  ACTIVITIES,
  PRODUCTS,
  GALLERY_FILTERS,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  BLOG_HERO_IMAGE,
} from "@/data/site";
import {
  Leaf,
  Home,
  Info,
  Sprout,
  Package,
  Image as ImageIcon,
  Newspaper,
  Network,
  Search as SearchIcon,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Site Index",
  description:
    "A complete map of every page on the Mahindra Integrated Farm website — pages, products, activities, blog categories and more.",
};

const MAIN_PAGES = [
  { href: "/", label: "Home", Icon: Home, desc: "Our story at a glance — hero, activities, products, why choose us and testimonials." },
  { href: "/about", label: "About Us", Icon: Info, desc: "Who we are, our vision, mission, values and integrated farming approach." },
  { href: "/farming-activities", label: "Farming Activities", Icon: Sprout, desc: "All 12 farming activities — dairy, poultry, goat, fish, mushroom, plantations and more." },
  { href: "/products", label: "Products", Icon: Package, desc: "Browse our farm-fresh products by category — vegetables, dairy, poultry, pulses, fruits." },
  { href: "/gallery", label: "Gallery", Icon: ImageIcon, desc: "Photo gallery, distributor network information and contact form." },
  { href: "/blog", label: "Blog", Icon: Newspaper, desc: "Stories, guides and insights on natural farming and seasonal produce." },
  { href: "/distributor", label: "Distributor", Icon: Network, desc: "Become a distributor — benefits, starter kit, process, regions and FAQ." },
  { href: "/careers", label: "Careers", Icon: Package, desc: "Open positions and how to join the Mahindra Integrated Farm team." },
  { href: "/search", label: "Search", Icon: SearchIcon, desc: "Search across our blog, products and farming activities." },
  { href: "/faq", label: "FAQ", Icon: HelpCircle, desc: "Frequently asked questions about products, orders and the distributor program." },
  { href: "/privacy", label: "Privacy Policy", Icon: ShieldCheck, desc: "How we handle your data, cookies and contact enquiries." },
];

export default function SiteIndexPage() {
  // Blog posts for the index (static data)
  const posts = BLOG_POSTS.filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((p) => ({ slug: p.slug, title: p.title, category: p.category }));

  return (
    <>
      <PageHero
        eyebrow="Complete Site Map"
        title="Site Index"
        subtitle="Every page on the Mahindra Integrated Farm website, in one place."
        image={BLOG_HERO_IMAGE}
      />

      <section className="bg-cream py-20 sm:py-24" aria-label="Site index">
        <div className="container-page">
          {/* Main pages */}
          <Reveal>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-mediumgreen" />
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-forest sm:text-2xl">
                Pages
              </h2>
            </div>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MAIN_PAGES.map((p, i) => (
              <Reveal
                key={p.href}
                delay={(i % 3) * 70}
                className="group h-full"
              >
                <Link
                  href={p.href}
                  className="flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lightgreen text-forest transition-colors group-hover:bg-forest group-hover:text-lightgreen">
                    <p.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-forest transition-colors group-hover:text-mediumgreen">
                      {p.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/60">
                      {p.desc}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Farming activities */}
          <div className="mt-14">
            <Reveal>
              <div className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-mediumgreen" />
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-forest sm:text-2xl">
                  Farming Activities
                </h2>
              </div>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {ACTIVITIES.map((a) => (
                <Link
                  key={a.name}
                  href="/farming-activities"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-colors hover:bg-forest hover:text-white"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="mt-12">
            <Reveal>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-mediumgreen" />
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-forest sm:text-2xl">
                  Products
                </h2>
              </div>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.name}
                  href="/products"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-colors hover:bg-forest hover:text-white"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Blog categories */}
          <div className="mt-12">
            <Reveal>
              <div className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-mediumgreen" />
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-forest sm:text-2xl">
                  Blog Categories
                </h2>
              </div>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {BLOG_CATEGORIES.filter((c) => c !== "All").map((c) => {
                const slug = c
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-");
                return (
                  <Link
                    key={c}
                    href={`/blog/category/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-colors hover:bg-forest hover:text-white"
                  >
                    {c}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* All blog posts */}
          {posts.length > 0 && (
            <div className="mt-12">
              <Reveal>
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-mediumgreen" />
                  <h2 className="text-xl font-extrabold uppercase tracking-tight text-forest sm:text-2xl">
                    All Blog Articles
                  </h2>
                </div>
              </Reveal>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-mediumgreen" />
                    <span className="flex-1 text-sm font-medium text-forest transition-colors group-hover:text-mediumgreen">
                      {p.title}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-ink/40">
                      {p.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Gallery filters */}
          <div className="mt-12">
            <Reveal>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-mediumgreen" />
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-forest sm:text-2xl">
                  Gallery Categories
                </h2>
              </div>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {GALLERY_FILTERS.map((g) => (
                <Link
                  key={g}
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-colors hover:bg-forest hover:text-white"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
