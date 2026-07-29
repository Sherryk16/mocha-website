import Link from "next/link";

import { IconArrowRight, IconLeaf, IconShield, IconTruck, IconCoffee } from "@/components/ui/icons";
import { Container } from "@/components/ui/layout";

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
    <section className="py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Why Choose Mocha Wholesale
          </h2>
          <p className="mt-3 text-lg text-gray-200">
            Your trusted partner for premium coffee and supplies
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <v.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-gray-200">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-coffee-900 hover:bg-accent/90"
          >
            Apply for Wholesale Account
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
