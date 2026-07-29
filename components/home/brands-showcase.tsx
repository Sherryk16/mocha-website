import Image from "next/image";
import Link from "next/link";

import { BRANDS } from "@/lib/brands";
import { Container } from "@/components/ui/layout";

export function BrandsShowcase() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Our Brands</h2>
          <p className="mt-3 text-lg text-gray-200">
            Premium coffee from three specialized roasters
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-lg transition hover:shadow-xl"
            >
              <Image
                src={brand.hero}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-bold text-white">
                  {brand.name}
                </h3>
                <p className="mt-1 text-sm text-gray-200">{brand.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
