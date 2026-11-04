import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { JobApplicationForm } from "@/components/site/JobApplicationForm";
import { BLOG_HERO_IMAGE, JOB_OPENINGS } from "@/data/site";
import { Briefcase, MapPin, CheckCircle2, Heart, Sprout, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Mahindra Integrated Farm — open positions in farm operations, livestock, logistics and more. Work with nature, grow with us.",
};

const PERKS = [
  { Icon: Sprout, title: "Work With Nature", description: "Spend your days outdoors on a working natural farm — no cubicles, just fresh air and green fields." },
  { Icon: Heart, title: "Fair & Honest", description: "Transparent pay, respectful treatment and a team that genuinely cares about your wellbeing." },
  { Icon: Users, title: "Learn & Grow", description: "Hands-on training in natural farming practices — skills you'll carry for life." },
  { Icon: CheckCircle2, title: "Real Impact", description: "Your work feeds families and supports a more sustainable way of farming." },
];

export default function CareersPage() {
  const jobOptions = JOB_OPENINGS.map((j) => ({ id: j.id, title: j.title }));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mahindraintegratedfarm.example" },
      { "@type": "ListItem", position: 2, name: "Careers", item: "https://mahindraintegratedfarm.example/careers" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero
        eyebrow="Grow With Us"
        title="Careers At The Farm"
        subtitle="Join a team that's rebuilding agriculture the honest way — natural, sustainable and rooted in community."
        image={BLOG_HERO_IMAGE}
      />

      {/* Why work with us */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Why work with us">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Life On The Farm"
              title="Why Work With Us"
              subtitle="More than a job — a chance to do meaningful work close to nature, with people who respect you."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 4) * 80}
                className="group h-full rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lightgreen text-forest transition-colors group-hover:bg-forest group-hover:text-lightgreen">
                  <p.Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-base font-bold text-forest">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-white py-20 sm:py-24" aria-label="Open positions">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Open Positions"
              title="Current Job Openings"
              subtitle="If a role fits your skills and values, we'd love to hear from you. Don't see a perfect match? Apply anyway — we keep good people in mind."
            />
          </Reveal>
          <div className="mt-12 space-y-5">
            {JOB_OPENINGS.map((job, i) => (
              <Reveal
                key={job.id}
                delay={(i % 3) * 70}
                className="group rounded-3xl bg-cream p-6 ring-1 ring-black/5 transition-all duration-300 hover:shadow-soft sm:p-7"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        <Briefcase className="h-3 w-3" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-lightgreen px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-forest">
                        {job.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-ink/50">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-forest">{job.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {job.description}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-ink/65">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mediumgreen" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0">
                    <Button href={`#apply-${job.id}`} variant="primary" size="md" withArrow>
                      Apply
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Apply">
        <div className="container-page">
          <div id="apply" className="mx-auto max-w-2xl scroll-mt-28">
            <Reveal>
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lightgreen text-forest">
                    <Briefcase className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-forest sm:text-2xl">Apply Now</h2>
                    <p className="text-sm text-ink/60">Fill in the form and we&apos;ll be in touch.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <JobApplicationForm jobs={jobOptions} />
                </div>
              </div>
            </Reveal>

            {/* General CTA */}
            <div className="mt-8 rounded-3xl bg-forest p-7 text-center text-white sm:p-8">
              <h3 className="text-lg font-extrabold sm:text-xl">Don&apos;t See The Right Role?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-cream/80">
                We&apos;re always happy to meet people who care about natural farming.
                Send us a note and tell us how you&apos;d like to contribute.
              </p>
              <div className="mt-5 flex justify-center">
                <Button href="/contact" variant="light" size="md" withArrow>
                  Reach Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
