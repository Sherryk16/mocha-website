import { Container } from "@/components/ui/layout";

const PARTNERS = [
  { name: "1883", src: "/partners/1883.png" },
  { name: "Monin", src: "/partners/monin.webp" },
  { name: "Hollander", src: "/partners/hollander.webp" },
  { name: "Chobani", src: "/partners/chobani.png" },
  { name: "Eversys", src: "/partners/eversys.webp" },
];

export function PartnersSection() {
  return (
    <section className="bg-coffee-50 py-12 sm:py-20">
      <Container>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-700">
            Trusted Partners
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Brands we carry
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            We distribute the ingredients and equipment the world&rsquo;s best
            cafés rely on every day.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-5 items-center justify-items-center gap-x-3 gap-y-6 sm:mt-14 sm:gap-x-12 sm:gap-y-10">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex h-full w-full items-center justify-center"
              title={p.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="block h-10 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-20 md:h-24 lg:h-28"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
