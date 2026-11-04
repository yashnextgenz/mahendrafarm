import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { FAQSection } from "@/components/site/FAQSection";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BLOG_HERO_IMAGE, GENERAL_FAQS, DISTRIBUTOR_FAQS } from "@/data/site";
import { HelpCircle, Network, MessageCircleQuestion, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Mahindra Integrated Farm — our products, freshness, delivery, distributor program and more.",
};

export default function FAQPage() {
  // FAQPage JSON-LD structured data (combines general + distributor FAQs)
  const allFaqs = [...GENERAL_FAQS, ...DISTRIBUTOR_FAQS];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mahindraintegratedfarm.example" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://mahindraintegratedfarm.example/faq" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        subtitle="Quick, honest answers about our products, delivery and distributor program. Can't find what you need? Just ask us."
        image={BLOG_HERO_IMAGE}
      />

      {/* General FAQs (light) */}
      <section className="bg-cream py-20 sm:py-24" aria-label="General questions">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-lightgreen px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-mediumgreen">
                <MessageCircleQuestion className="h-3.5 w-3.5" />
                Products & Orders
              </span>
              <h2 className="mt-5 text-3xl font-extrabold uppercase tracking-tight text-forest sm:text-4xl">
                General Questions
              </h2>
              <span className="mt-3 h-1 w-16 rounded-full bg-mediumgreen" />
            </div>
          </Reveal>
          <div className="mt-10">
            <LightFAQSection faqs={GENERAL_FAQS} />
          </div>
        </div>
      </section>

      {/* Distributor FAQs (dark) */}
      <section className="relative overflow-hidden bg-forest py-20 text-white sm:py-24" aria-label="Distributor questions">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mediumgreen/20 blur-3xl"
        />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15">
                <Network className="h-3.5 w-3.5" />
                Partnership Program
              </span>
              <h2 className="mt-5 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
                Distributor Questions
              </h2>
              <span className="mt-3 h-1 w-16 rounded-full bg-mediumgreen" />
            </div>
          </Reveal>
          <div className="mt-10">
            <FAQSection faqs={DISTRIBUTOR_FAQS} />
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="bg-cream py-16 sm:py-20" aria-label="Still have questions">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-lightgreen px-6 py-12 text-center shadow-soft ring-1 ring-mediumgreen/15 sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/40 blur-2xl"
              />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lightgreen">
                <HelpCircle className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold uppercase tracking-tight text-forest sm:text-3xl">
                Still Have Questions?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-ink/75">
                We&apos;re happy to help. Reach out and a real person from our team will
                get back to you — usually within a day.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="primary" size="lg" withArrow>
                  Contact Us
                </Button>
                <Button href="/distributor" variant="outline" size="lg">
                  <Leaf className="h-4 w-4" />
                  Become A Distributor
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Light-themed accordion variant for the general FAQs section. */
function LightFAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            value={`faq-${i}`}
            className="overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-soft data-[state=open]:bg-cream"
          >
            <AccordionTrigger className="py-5 text-left text-base font-semibold text-forest hover:no-underline sm:text-lg">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-ink/70 sm:text-base">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
