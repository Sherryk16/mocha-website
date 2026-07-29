import Link from "next/link";

import {
  IconArrowRight,
  IconLeaf,
  IconShield,
  IconTruck,
  IconCoffee,
} from "@/components/ui/icons";
import { Container } from "@/components/ui/layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const VALUES = [
  {
    icon: IconCoffee,
    title: "Roasted weekly",
    body: "Every White Rhino and Barista Underground roast is dated, batch-tracked and shipped within seven days of roast.",
  },
  {
    icon: IconLeaf,
    title: "Direct-trade sourcing",
    body: "Single-estate relationships across Ethiopia, Colombia, Guatemala and Sumatra. Full traceability on every lot.",
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

export function ValueProps() {
  return (
    <section className="bg-white py-16">
      <Container>
        <ScrollReveal direction="up" className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose Mocha Wholesale
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Your trusted partner for premium coffee and supplies
          </p>
        </ScrollReveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <ScrollReveal
                key={v.title}
                direction="up"
                delay={i * 100}
                duration={600}
              >
                <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c2185b] hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2d6a2d]/10 transition-colors duration-300 group-hover:bg-[#2d6a2d]/20">
                    <Icon className="h-6 w-6 text-[#2d6a2d] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{v.body}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        <ScrollReveal
          direction="up"
          delay={500}
          className="mt-12 text-center"
        >
          <Link
            href="/wholesale"
            className="group inline-flex items-center gap-2 rounded-full bg-[#c2185b] px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:bg-[#9c0e4a] hover:shadow-xl"
          >
            Apply for Wholesale Account
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
