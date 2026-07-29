import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { BRANDS } from "@/lib/brands";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "White Rhino Coffee, Barista Underground, and Coffee Bean Corral. Three roasters, one standard.",
};

export default function BrandsPage() {
  return (
    <>
      <section className="bg-coffee-100/40">
        <Container className="py-12 sm:py-16">
          <Eyebrow>Brands</Eyebrow>
          <Heading className="mt-2">Three roasters, one standard.</Heading>
          <p className="mt-3 max-w-2xl text-coffee-700">
            Every brand we ship is one we'd put on our own bar. Click through
            to see the line and what each roaster is built to do.
          </p>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <div className="space-y-10">
          {BRANDS.map((brand, i) => (
            <article
              key={brand.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl smooth-shadow">
                <Image
                  src={brand.hero}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <span
                  className="inline-block h-1.5 w-12 rounded-full"
                  style={{ background: brand.accent }}
                />
                <h2 className="mt-3 font-display text-3xl font-bold text-coffee-900 sm:text-4xl">
                  {brand.name}
                </h2>
                <p className="mt-2 font-display text-lg text-coffee-700">
                  {brand.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-coffee-700">
                  {brand.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-coffee-800 px-5 py-2.5 text-sm font-semibold text-coffee-50 hover:bg-coffee-900"
                  >
                    Explore {brand.name}
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-xs font-semibold uppercase tracking-wider text-coffee-500">
                    {brand.origin}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
