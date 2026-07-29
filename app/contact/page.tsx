import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact-section";
import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { IconMapPin, IconPhone, IconMail } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Mocha Wholesale desk — Mon to Fri, 8am to 6pm ET. Phone, email, and address for our Dearborn facility.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-white">
<Container className="py-10 sm:py-12 lg:py-16">
          <Eyebrow>Contact</Eyebrow>
          <Heading className="mt-2">Talk to a real person.</Heading>
          <p className="mt-3 max-w-xl text-gray-700">
            Whether you're an existing wholesale customer, applying for an
            account, or just curious about a product — our desk is open Mon to
            Fri, 8am to 6pm ET.
          </p>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <ContactBlock
            icon={IconPhone}
            label="Phone"
            value="313-208-0888"
            href="tel:+13132080888"
          />
          <ContactBlock
            icon={IconMail}
            label="Email"
            value="sale@mochawholesale.com"
            href="mailto:sale@mochawholesale.com"
          />
          <ContactBlock
            icon={IconMapPin}
            label="Location"
            value="15401 Century Dr., Suite 301, Dearborn, MI 48120"
            href="https://maps.google.com/?q=15401+Century+Dr+Dearborn+MI"
          />
        </div>
      </Container>
      <ContactSection />
    </>
  );
}

function ContactBlock({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <Icon className="h-6 w-6 text-[#5d4037]" />
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-[#5d4037]">
        {value}
      </p>
    </a>
  );
}
