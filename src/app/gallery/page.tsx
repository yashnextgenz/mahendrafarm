import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GalleryExplorer } from "@/components/site/GalleryExplorer";
import { ContactForm } from "@/components/site/ContactForm";
import { Button } from "@/components/site/Button";
import {
  GALLERY_HERO_IMAGE,
  SITE,
  DISTRIBUTOR_BENEFITS,
  DISTRIBUTOR_STEPS,
} from "@/data/site";
import { CheckCircle2, Phone, Mail, MapPin, Network, Handshake, Truck, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery, Distributor Network & Contact",
  description:
    "View our farm gallery, join the Mahindra Integrated Farm distributor network, or get in touch. Call 97895 40045 or email selvomehan@gmail.com.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Farm In Pictures"
        title="Our Farm Gallery"
        subtitle="A glimpse into our farms, people and sustainable practices."
        image={GALLERY_HERO_IMAGE}
      />

      {/* ============ SECTION 1: GALLERY ============ */}
      <section id="gallery" className="bg-cream py-20 sm:py-24 scroll-mt-28" aria-label="Photo gallery">
        <div className="container-page">
          <SectionHeading
            eyebrow="Snapshots"
            title="Life On The Farm"
            subtitle="Filter through moments from our farms — fresh produce, healthy livestock, hard-working teams and the harvest that feeds families."
          />
          <div className="mt-10">
            <GalleryExplorer />
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: DISTRIBUTOR NETWORK ============ */}
      <section
        id="distributor"
        className="relative overflow-hidden bg-forest py-20 text-white scroll-mt-28 sm:py-24"
        aria-label="Distributor network"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-mediumgreen/20 blur-3xl"
        />
        <div className="container-page relative">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15">
              <Network className="h-3.5 w-3.5" />
              Partnership Program
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              Join Our Distributor Network
            </h2>
            <span className="mt-3 h-1 w-16 rounded-full bg-mediumgreen" />
            <p className="mt-4 max-w-2xl text-base text-cream/80 sm:text-lg">
              Partner with Mahindra Integrated Farm and bring naturally grown farm
              products to more customers.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DISTRIBUTOR_BENEFITS.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lightgreen" />
                <p className="text-sm font-medium text-cream/90">{b}</p>
              </div>
            ))}
          </div>

          {/* 3-step process */}
          <div className="mt-12">
            <h3 className="text-center text-xl font-extrabold uppercase tracking-wide text-lightgreen">
              Become A Distributor In 3 Simple Steps
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {DISTRIBUTOR_STEPS.map((step, i) => {
                const Icons = [Handshake, Network, Truck];
                const Icon = Icons[i] ?? Handshake;
                return (
                  <div
                    key={step.title}
                    className="relative rounded-3xl bg-white/10 p-7 ring-1 ring-white/10 backdrop-blur"
                  >
                    <span className="absolute right-5 top-4 text-4xl font-extrabold text-lightgreen/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lightgreen text-forest">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h4 className="mt-5 text-lg font-bold text-white">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-cream/80">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl bg-lightgreen/95 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-2xl font-extrabold text-forest sm:text-3xl">
                Ready to grow with us?
              </p>
              <p className="mt-1 text-sm text-ink/70">
                Fill the form below or call us directly — we&apos;ll take it from there.
              </p>
            </div>
            <Button href="#contact" variant="primary" size="lg" withArrow className="shrink-0">
              Become A Distributor
            </Button>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: CONTACT ============ */}
      <section
        id="contact"
        className="bg-cream py-20 scroll-mt-28 sm:py-24"
        aria-label="Contact us"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="We&apos;d Love To Hear From You"
            title="Get In Touch"
            subtitle="Have a question, an order, or want to partner with us? Reach out and we&apos;ll respond quickly."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Contact info cards */}
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-mediumgreen">
                  Contact Information
                </h3>
                <ul className="mt-5 space-y-5">
                  <li>
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="group flex items-start gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lightgreen text-forest transition-colors group-hover:bg-forest group-hover:text-lightgreen">
                        <Phone className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wide text-ink/60">
                          Phone
                        </span>
                        <span className="text-base font-bold tabular-nums text-forest">
                          {SITE.phone}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className="group flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lightgreen text-forest transition-colors group-hover:bg-forest group-hover:text-lightgreen">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wide text-ink/60">
                          Email
                        </span>
                        <span className="break-all text-base font-bold text-forest">
                          {SITE.email}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lightgreen text-forest">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-ink/60">
                        Address
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-forest">
                        {SITE.address.join(" ")}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quick guarantee card */}
              <div className="rounded-3xl bg-forest p-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lightgreen text-forest">
                    <BadgeCheck className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Fast, Friendly Response</p>
                    <p className="text-xs text-cream/75">Typically within one business day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-8">
                <h3 className="text-lg font-bold text-forest">Send Us An Enquiry</h3>
                <p className="mt-1 text-sm text-ink/60">
                  Fill in the form and our team will get back to you shortly.
                </p>
                <ContactForm className="mt-6" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
