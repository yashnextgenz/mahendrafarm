import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/site/Button";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
import { ACTIVITIES, FARMING_HERO_IMAGE } from "@/data/site";
import { ArrowRight, Sprout, Recycle, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Farming Activities",
  description:
    "Explore the 12 diverse farming activities at Mahindra Integrated Farm — dairy, poultry, goat, fish, mushroom, vetiver, flowers, vegetables, groundnut, coconut, banana and teak plantation.",
};

export default function FarmingActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Farming Activities"
        subtitle="Diverse Farming for a Sustainable Future"
        image={FARMING_HERO_IMAGE}
      />

      {/* Activity cards grid */}
      <section className="bg-cream py-20 sm:py-24" aria-label="All farming activities">
        <div className="container-page">
          <SectionHeading
            eyebrow="Explore"
            title="12 Farming Activities, One Integrated Farm"
            subtitle="Each activity is run naturally and supports the others — creating a balanced, sustainable farm ecosystem."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ACTIVITIES.map((act, i) => (
              <Reveal as="article" key={act.name} delay={(i % 4) * 80}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={act.image}
                    alt={act.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading={i < 4 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkgreen/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-forest shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-forest">
                    {act.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                    {act.description}
                  </p>
                  <a
                    href="/gallery#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-mediumgreen transition-colors hover:text-forest"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Farming Model */}
      <section className="bg-white py-20 sm:py-24" aria-label="Integrated farming model">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Bigger Picture"
            title="Our Integrated Farming Model"
            subtitle="Multiple activities working together as one sustainable ecosystem — sharing resources, reducing waste, and supporting each other naturally."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                Icon: Recycle,
                title: "Resource Sharing",
                description:
                  "Livestock manure becomes crop fertilizer. Crop residue feeds livestock. Ponds irrigate fields. Nothing is wasted.",
              },
              {
                Icon: Sprout,
                title: "Natural Balance",
                description:
                  "Mixed crops and animals keep pests in check, reduce disease, and keep the soil alive without chemicals.",
              },
              {
                Icon: Users,
                title: "Shared Livelihoods",
                description:
                  "A diversified farm gives farmers stable, year-round income and reduces dependence on any single activity.",
              },
            ].map(({ Icon, title, description }) => (
              <article
                key={title}
                className="rounded-3xl bg-cream p-7 ring-1 ring-black/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lightgreen">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
              </article>
            ))}
          </div>

          {/* Flow diagram */}
          <div className="mt-12 rounded-3xl bg-forest p-7 text-white sm:p-10">
            <h3 className="text-center text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
              How It All Connects
            </h3>
            <div className="mt-8 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-between">
              {[
                "Crops & Plantations",
                "Livestock & Poultry",
                "Ponds & Aquaculture",
                "Compost & Soil",
              ].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-4 lg:flex-1 lg:flex-col">
                  <div className="flex w-full items-center justify-center rounded-2xl bg-white/10 px-5 py-4 text-center text-sm font-bold uppercase tracking-wide text-lightgreen ring-1 ring-white/15">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-2xl text-lightgreen lg:rotate-90" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Distributor call to action">
        <CTASection />
      </section>
    </>
  );
}
