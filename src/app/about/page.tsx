import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatsSection } from "@/components/site/StatsSection";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import {
  ABOUT_HERO_IMAGE,
  ABOUT_WHO_IMAGE,
  ABOUT_VISION_IMAGE,
  ABOUT_MISSION_IMAGE,
  STATS,
  SITE,
} from "@/data/site";
import { Leaf, Eye, Target, Heart, Recycle, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mahindra Integrated Farm — our story, vision, mission, values and our integrated natural farming approach for a sustainable future.",
};

const VALUES = [
  {
    Icon: Leaf,
    title: "Natural & Honest",
    description:
      "We farm without synthetic chemicals and stay transparent about everything we grow and sell.",
  },
  {
    Icon: Recycle,
    title: "Sustainability First",
    description:
      "Every decision weighs its impact on soil, water, animals and the people we serve.",
  },
  {
    Icon: Heart,
    title: "Community Centered",
    description:
      "We support local farmers and rural communities with fair partnerships and shared growth.",
  },
  {
    Icon: BadgeCheck,
    title: "Quality You Can Trust",
    description:
      "From seed to harvest to your table, freshness and hygiene are non-negotiable.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Mahindra Integrated Farm"
        subtitle="Growing Naturally. Building Sustainably."
        image={ABOUT_HERO_IMAGE}
      />

      {/* Who We Are */}
      <section className="bg-white py-20 sm:py-24" aria-label="Who we are">
        <div className="container-page">
          <Reveal>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={ABOUT_WHO_IMAGE}
                  alt="Farmers working together on an integrated farm"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-forest px-5 py-4 text-white shadow-float sm:block">
                <p className="text-2xl font-extrabold">10+</p>
                <p className="text-xs text-cream/80">Years of Natural Farming</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                align="left"
                eyebrow="Who We Are"
                title="A Farm Rooted in Nature & Trust"
              />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/75">
                <p>
                  Mahindra Integrated Farm is a sustainable agriculture enterprise
                  based in Tamil Nadu, India. We bring together a wide range of
                  farming activities — from dairy and poultry to plantations and
                  vegetable cultivation — under one natural, integrated model.
                </p>
                <p>
                  Our farms are run by experienced farmers who believe that honest,
                  chemical-free farming is the only way to feed communities
                  healthily for generations to come. Every product that leaves our
                  farm carries the promise of purity and freshness.
                </p>
              </div>
              <div className="mt-7">
                <Button href="/farming-activities" variant="primary" withArrow>
                  Explore Our Activities
                </Button>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Our impact in numbers">
        <div className="container-page">
          <Reveal>
            <StatsSection stats={STATS} variant="card" />
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-20 sm:py-24" aria-label="Vision and mission">
        <div className="container-page space-y-16">
          {/* Vision */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Our Vision"
                title="A Healthier Tomorrow Through Natural Farming"
              />
              <p className="mt-5 text-base leading-relaxed text-ink/75">
                To become a trusted name in natural and integrated farming —
                producing wholesome food while restoring soil, supporting rural
                livelihoods, and inspiring more farmers to grow responsibly.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-lightgreen/60 px-5 py-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-lightgreen">
                  <Eye className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium text-forest">
                  Healthy soil, healthy food, healthy people.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
              <Image
                src={ABOUT_VISION_IMAGE}
                alt="Open farmland with rolling green hills under a wide sky"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={ABOUT_MISSION_IMAGE}
                  alt="Farmer tending to crops in the field"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                align="left"
                eyebrow="Our Mission"
                title="Grow Naturally, Serve Honestly"
              />
              <p className="mt-5 text-base leading-relaxed text-ink/75">
                Our mission is to deliver fresh, naturally grown produce and
                livestock to homes and businesses through a transparent farm-to-table
                network — while empowering local farmers with fair, sustainable
                livelihoods.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-lightgreen/60 px-5 py-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-lightgreen">
                  <Target className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium text-forest">
                  From our farm, straight to your table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Our values">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Values"
            subtitle="The principles that guide every decision on our farm."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, description }, i) => (
              <Reveal as="article" key={title} delay={i * 90}
                className="group h-full rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lightgreen text-forest transition-colors group-hover:bg-forest group-hover:text-lightgreen">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated approach */}
      <section className="bg-white py-20 sm:py-24" aria-label="Integrated farming approach">
        <div className="container-page">
          <SectionHeading
            eyebrow="How We Farm"
            title="Our Integrated Farming Approach"
            subtitle="Multiple farming activities working together as one sustainable ecosystem — reducing waste, improving soil, and sharing resources."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Share Resources",
                description:
                  "Crop residue feeds livestock; livestock manure nourishes crops. Water and waste are reused across activities.",
              },
              {
                step: "02",
                title: "Diversify Income",
                description:
                  "Dairy, poultry, vegetables and plantations create stable, year-round income for partner farmers.",
              },
              {
                step: "03",
                title: "Restore Nature",
                description:
                  "Crop rotation, composting and natural pest control keep soil living and water clean.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="relative overflow-hidden rounded-3xl bg-cream p-7 ring-1 ring-black/5"
              >
                <span className="text-5xl font-extrabold text-lightgreen">{item.step}</span>
                <h3 className="mt-3 text-xl font-bold text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability + Quality */}
      <section className="bg-forest py-20 sm:py-24 text-white" aria-label="Sustainability and quality">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15">
              <Recycle className="h-3.5 w-3.5" />
              Sustainability
            </span>
            <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">Farming that gives back to the land</h3>
            <p className="mt-4 text-cream/80">
              We compost farm waste, reuse water, plant trees alongside crops, and
              avoid synthetic chemicals — so the soil we farm on today stays fertile
              for the generations of tomorrow.
            </p>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15">
              <BadgeCheck className="h-3.5 w-3.5" />
              Quality &amp; Trust
            </span>
            <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">Freshness you can rely on</h3>
            <p className="mt-4 text-cream/80">
              Every harvest is checked for freshness, packed hygienically, and moved
              quickly through our distributor network — so what reaches you is as
              close to farm-fresh as it can be.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Let's grow together">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-lightgreen px-6 py-12 text-center shadow-soft ring-1 ring-mediumgreen/15 sm:px-12">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-forest sm:text-4xl">
              Let&apos;s Grow Together
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-ink/75">
              Whether you want fresh produce, a reliable supply partner, or to become
              a distributor — we&apos;d love to hear from you.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/gallery#contact" variant="primary" size="lg" withArrow>
                Get In Touch
              </Button>
              <Button href="/products" variant="outline" size="lg">
                View Our Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
