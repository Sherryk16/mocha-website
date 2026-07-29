import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { WholesaleApplicationForm } from "@/components/wholesale/application-form";
import { IconCheck, IconShield, IconTruck } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Apply for a wholesale account",
  description:
    "Apply for a Mocha Wholesale account. Verified EIN gets you member pricing, standing orders, and same-week delivery.",
};

const BENEFITS = [
  {
    icon: IconShield,
    title: "EIN-verified pricing",
    body: "We verify your EIN at the IRS so we can lock in honest member pricing without abuse.",
  },
  {
    icon: IconTruck,
    title: "Same-week delivery",
    body: "Free freight on standing orders over $250 across Michigan, Ohio and Indiana.",
  },
  {
    icon: IconCheck,
    title: "Net-30 terms",
    body: "Approved accounts can pay on terms — no more rushing cards at the end of the month.",
  },
];

export default function WholesalePage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <Container className="py-12 sm:py-16">
          <Eyebrow>Wholesale application</Eyebrow>
          <Heading className="mt-2">Apply for a wholesale account.</Heading>
          <p className="mt-3 max-w-2xl text-gray-700">
            Mocha Wholesale serves licensed businesses — cafés, restaurants,
            bakeries, hotels, offices and grocery. Apply with your EIN to
            unlock member pricing, standing orders and same-week delivery.
          </p>
          <nav className="mt-3 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Wholesale</span>
          </nav>
        </Container>
      </section>
      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-5">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <Icon className="h-6 w-6 text-coffee-700" />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {b.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{b.body}</p>
              </div>
            );
          })}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Already approved?</p>
            <p className="mt-1">
              Sign in and we'll apply your member pricing automatically.
            </p>
            <Link
              href="/account/login?return=/wholesale"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#5d4037] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#3e2723]"
            >
              Sign in →
            </Link>
          </div>
        </aside>
        <div>
          <WholesaleApplicationForm />
        </div>
      </Container>
    </>
  );
}
