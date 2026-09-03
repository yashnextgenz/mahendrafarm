import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ProductsExplorer } from "@/components/site/ProductsExplorer";
import { CTASection } from "@/components/site/CTASection";
import { PRODUCTS_HERO_IMAGE } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse farm-fresh products from Mahindra Integrated Farm — fresh vegetables, flowers, dairy, poultry, groundnuts & pulses, fruits and plantation products. Filter by category and enquire today.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="From Our Farms"
        title="Our Farm Products"
        subtitle="Fresh From Our Farms To Your Table"
        image={PRODUCTS_HERO_IMAGE}
      />

      <section className="bg-cream py-20 sm:py-24" aria-label="Products catalogue">
        <div className="container-page">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-forest sm:text-3xl">
              Naturally Grown, Freshly Delivered
            </h2>
            <p className="mt-3 text-base text-ink/70">
              Filter our range by category to find what you need. Every product is
              grown and handled the natural way.
            </p>
          </div>
          <ProductsExplorer />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-label="Distributor call to action">
        <CTASection />
      </section>
    </>
  );
}
