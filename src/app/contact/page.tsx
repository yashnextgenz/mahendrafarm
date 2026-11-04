import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContactForm } from "@/components/site/ContactForm";
import { GALLERY_HERO_IMAGE, SITE } from "@/data/site";
import { Phone, Mail, MapPin, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mahindra Integrated Farm for orders, distributorship or general enquiries. We typically respond within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Questions, orders or partnerships — we'd love to hear from you."
        image={GALLERY_HERO_IMAGE}
      />

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
