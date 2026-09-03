import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/site/Button";
import { BLOG_HERO_IMAGE, SITE } from "@/data/site";
import { Cookie, ShieldCheck, Database, Mail, Eye, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mahindra Integrated Farm handles your data, cookies and contact enquiries. We keep things simple, honest and minimal.",
};

const SECTIONS = [
  {
    Icon: Database,
    title: "What We Collect",
    body: [
      "When you fill in our contact form, we collect your name, email, phone number and the message you send us — only so we can respond to your enquiry.",
      "When you subscribe to our newsletter, we collect your email address so we can send you seasonal farm updates.",
      "We do not collect payment card details or any financial information through this website.",
    ],
  },
  {
    Icon: Eye,
    title: "How We Use Your Information",
    body: [
      "Your contact form details are used solely to reply to your enquiry and, if you become a customer or distributor, to fulfil that relationship.",
      "Your newsletter email is used only to send occasional farm updates — never more than once a month.",
      "We never sell, rent or trade your information with anyone.",
    ],
  },
  {
    Icon: Cookie,
    title: "Cookies",
    body: [
      "We use essential cookies needed to run this website (such as remembering your theme and consent choices).",
      "Our cookie banner lets you choose between \"Accept All\" (enables optional analytics in the future) and \"Essential Only\" (only the cookies required to operate the site).",
      "You can change your choice anytime by clearing the \"mif-cookie-consent\" entry in your browser's local storage.",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Data Storage & Security",
    body: [
      "Contact enquiries and newsletter subscriptions are stored in our own database, accessed only by our team.",
      "We apply reasonable access controls. However, no internet transmission is ever fully secure — please don't share sensitive information via our forms.",
    ],
  },
  {
    Icon: Lock,
    title: "Your Rights",
    body: [
      "You can ask us to view, correct or delete any personal information we hold about you at any time.",
      "To unsubscribe from the newsletter, simply reply to any email and we will remove you promptly.",
      "To request data deletion, email us at the address below.",
    ],
  },
  {
    Icon: Mail,
    title: "Contacting Us",
    body: [
      `If you have any questions about how we handle your data, please write to us at ${SITE.email} or call ${SITE.phone}.`,
      `Our postal address: ${SITE.address.join(" ")}`,
      "We aim to respond to all privacy-related requests within a week.",
    ],
  },
];

export default function PrivacyPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mahindraintegratedfarm.example" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://mahindraintegratedfarm.example/privacy" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero
        eyebrow="Your Trust Matters"
        title="Privacy Policy"
        subtitle="How we handle your data, cookies and contact enquiries — kept simple, honest and minimal."
        image={BLOG_HERO_IMAGE}
      />

      <section className="bg-cream py-20 sm:py-24" aria-label="Privacy policy">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-8">
              <p className="text-sm text-ink/60">
                Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink/80">
                Mahindra Integrated Farm respects your privacy. This policy explains what
                information we collect through this website, why we collect it, and the
                choices you have. We keep things minimal — we only collect what we genuinely
                need to serve you.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {SECTIONS.map(({ Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lightgreen text-forest">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h2 className="text-xl font-bold text-forest sm:text-2xl">{title}</h2>
                  </div>
                  <div className="mt-4 space-y-3">
                    {body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-ink/75 sm:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-3xl bg-forest p-7 text-center text-white sm:p-8">
              <h3 className="text-xl font-extrabold sm:text-2xl">Questions About Your Data?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-cream/80">
                We&apos;re happy to explain anything in this policy or help with a data request.
              </p>
              <div className="mt-5 flex justify-center">
                <Button href="/gallery#contact" variant="light" size="lg" withArrow>
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
