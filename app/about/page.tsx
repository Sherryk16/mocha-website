import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import {
  IconArrowRight,
  IconCheck,
  IconCoffee,
  IconLeaf,
  IconShield,
  IconTruck,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About Mocha Wholesale",
  description:
    "Michigan-based wholesale coffee and café supplier. Family-roasted single-origin beans, signature blends and standing-order service.",
};

const VALUES = [
  {
    icon: IconCoffee,
    title: "Roasted to order",
    body: "Every White Rhino and Barista Underground roast is dated and batch-tracked. We don't ship anything older than seven days from roast.",
  },
  {
    icon: IconLeaf,
    title: "Direct-trade sourcing",
    body: "Single-estate relationships across Ethiopia, Colombia, Guatemala and Sumatra. Full traceability from cherry to cup.",
  },
  {
    icon: IconShield,
    title: "Wholesale-only pricing",
    body: "Approved accounts unlock member pricing and standing-order discounts. EIN verification keeps our pricing honest.",
  },
  {
    icon: IconTruck,
    title: "Same-week delivery",
    body: "Pallet-rate shipping across Michigan, Ohio and Indiana. Free freight on standing orders over $250.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="relative h-[320px] overflow-hidden bg-black sm:h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <Container className="relative z-10 flex h-full items-center">
            <div className="max-w-2xl">
              <Eyebrow className="text-[#c2185b]">About us</Eyebrow>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl text-balance">
                Built for cafés that don't have time for surprises.
              </h1>
              <p className="mt-4 text-base text-gray-100 sm:text-lg">
                Michigan-based wholesale coffee and café supplier. Family
                roasted, family supported.
              </p>
            </div>
          </Container>
        </div>
      </section>
      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <Heading className="mt-2">
              From a single roaster to a wholesale desk.
            </Heading>
            <p className="mt-4 leading-relaxed text-gray-700">
              Mocha Wholesale was founded in Dearborn, Michigan by a small
              group of café owners and roasters who wanted one wholesale partner
              they could actually trust. Today we supply cafés, restaurants,
              bakeries and offices across the Midwest with coffee, sauces,
              syrups and café essentials — and we still answer the phone.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              We understand the day-to-day realities café owners and food
              service operators face — maintaining drink consistency, managing
              supply schedules, training staff on products and meeting changing
              customer preferences. That's why we focus on supplying products
              that perform well in busy café environments while keeping
              ordering and distribution straightforward for our clients.
            </p>
          </div>
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <Eyebrow>Mission</Eyebrow>
              <p className="mt-2 text-lg font-semibold leading-relaxed text-gray-900">
                To supply cafés and food establishments with dependable
                coffee, tea and café products that support consistent quality
                and efficient daily service.
              </p>
              <hr className="my-5 border-gray-200" />
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-2 text-lg font-semibold leading-relaxed text-gray-900">
                To grow as a trusted wholesale partner — combining tradition,
                consistency and responsive service in a changing café
                industry.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <Eyebrow>What we stand on</Eyebrow>
          <Heading className="mt-2">Four things we don't compromise on.</Heading>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#2d6a2d]" />
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{v.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#c2185b] text-white">
            <IconCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Ready to brew with us?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Apply for a wholesale account and we'll lock in your member pricing
            and schedule a same-week first delivery.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/wholesale"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#c2185b] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#9c0e4a]"
            >
              Apply for wholesale
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full border border-gray-300 px-6 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Talk to a person
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
