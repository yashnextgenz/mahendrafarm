import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SearchExplorer } from "@/components/site/SearchExplorer";
import { BLOG_HERO_IMAGE } from "@/data/site";
import { Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search across Mahindra Integrated Farm's blog articles, farm products and farming activities.",
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Find What You Need"
        title="Search The Farm"
        subtitle="Search across our blog articles, farm products and farming activities."
        image={BLOG_HERO_IMAGE}
      />

      <section className="bg-cream py-20 sm:py-24" aria-label="Search results">
        <div className="container-page">
          <SearchExplorer />
        </div>
      </section>
    </>
  );
}
