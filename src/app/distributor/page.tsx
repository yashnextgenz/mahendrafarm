import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQSection } from "@/components/site/FAQSection";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import {
  FARMING_HERO_IMAGE,
  DISTRIBUTOR_BENEFITS,
  DISTRIBUTOR_STEPS,
  DISTRIBUTOR_FAQS,
  DISTRIBUTOR_KIT,
  DISTRIBUTOR_REGIONS,
  DISTRIBUTOR_TESTIMONIALS,
} from "@/data/site";
import {
  Network,
  Handshake,
  Truck,
  Package,
  TrendingUp,
  Palette,
  CheckCircle2,
  MapPin,
  Leaf,
  ArrowRight,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Distributor Network",
  description:
    "Partner with Mahindra Integrated Farm and bring naturally grown farm products to more customers. Benefits, starter kit, process, regions served and FAQ.",
};

const KIT_ICONS: Record<string, typeof Package> = {
  Package,
  TrendingUp,
  Palette,
  Truck,
};

export default function DistributorPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership Program"
        title="Join Our Distributor Network"
        subtitle="Partner with Mahindra Integrated Farm and bring naturally grown farm products to more customers."
        image={FARMING_HERO_IMAGE}
      />

      {/* Intro + benefits */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Why partner with us">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Why Partner With Us"
              title="Grow Your Business The Natural Way"
              subtitle="When you distribute for Mahindra Integrated Farm, you're backed by a brand customers already trust — and products that genuinely sell themselves."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DISTRIBUTOR_BENEFITS.map((b, i) => (
              <Reveal
                key={b}
                delay={(i % 5) * 70}
                className="flex h-full items-start gap-3 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lightgreen text-forest">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium text-ink/85">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3-step process */}
      <section className="bg-white py-20 sm:py-24" aria-label="How to become a distributor">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Simple Onboarding"
              title="Become A Distributor In 3 Steps"
              subtitle="A clear, honest path from your first call to your first delivery — no hidden conditions."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DISTRIBUTOR_STEPS.map((step, i) => {
              const Icons = [Handshake, Network, Truck];
              const Icon = Icons[i] ?? Handshake;
              return (
                <Reveal
                  key={step.title}
                  delay={i * 90}
                  className="relative overflow-hidden rounded-3xl bg-cream p-7 ring-1 ring-black/5"
                >
                  <span className="absolute right-5 top-4 text-5xl font-extrabold text-mediumgreen/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lightgreen">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-forest">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you get (starter kit) */}
      <section className="bg-cream py-20 sm:py-24" aria-label="What you receive">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Your Starter Kit"
              title="What You Receive As A Distributor"
              subtitle="Everything you need to start supplying natural farm products with confidence."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DISTRIBUTOR_KIT.map((item, i) => {
              const Icon = KIT_ICONS[item.icon] ?? Package;
              return (
                <Reveal
                  key={item.title}
                  delay={(i % 4) * 80}
                  className="group h-full rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lightgreen text-forest transition-colors group-hover:bg-forest group-hover:text-lightgreen">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-forest">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regions served */}
      <section className="bg-white py-20 sm:py-24" aria-label="Regions we serve">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Where We Operate"
                title="Regions We Currently Serve"
                subtitle="Our network is strongest across Tamil Nadu. If you're near any of these regions — or can manage your own logistics further afield — we'd love to talk."
              />
              <div className="mt-7 flex flex-wrap gap-2.5">
                {DISTRIBUTOR_REGIONS.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-3.5 py-1.5 text-sm font-semibold text-forest"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={FARMING_HERO_IMAGE}
                  alt="Farm landscape representing the regions we serve"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkgreen/40 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Distributor testimonials */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Distributor stories">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Real Partnerships"
              title="What Our Distributors Say"
              subtitle="Honest words from partners who've grown their business with us."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DISTRIBUTOR_TESTIMONIALS.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 90}
                className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/5"
              >
                <Quote className="absolute right-5 top-5 h-9 w-9 text-lightgreen/50" aria-hidden />
                <p className="flex-1 text-sm leading-relaxed text-ink/80">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-sm font-bold uppercase text-lightgreen">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-forest">{t.name}</p>
                    <p className="text-xs text-ink/60">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-forest py-20 text-white sm:py-24" aria-label="Distributor FAQ">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mediumgreen/20 blur-3xl"
        />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15">
                <Leaf className="h-3.5 w-3.5" />
                Common Questions
              </span>
              <h2 className="mt-5 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <span className="mt-3 h-1 w-16 rounded-full bg-mediumgreen" />
            </div>
          </Reveal>
          <div className="mt-10">
            <FAQSection faqs={DISTRIBUTOR_FAQS} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Become a distributor">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-lightgreen px-6 py-12 text-center shadow-soft ring-1 ring-mediumgreen/15 sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/40 blur-2xl"
              />
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-forest sm:text-4xl">
                Ready To Grow With Us?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-ink/75">
                Fill the contact form or call us directly. We'll walk you through every
                detail honestly — no pressure, no hidden terms.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="primary" size="lg" withArrow>
                  Become A Distributor
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Talk To Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
