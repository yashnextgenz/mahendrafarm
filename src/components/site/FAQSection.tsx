"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import type { FAQ } from "@/data/site";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen">
        <HelpCircle className="h-4 w-4" />
        Frequently Asked Questions
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="space-y-3"
      >
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            value={`faq-${i}`}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 backdrop-blur data-[state=open]:bg-white/10"
          >
            <AccordionTrigger className="py-5 text-left text-base font-semibold text-white hover:no-underline sm:text-lg">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-cream/80 sm:text-base">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
