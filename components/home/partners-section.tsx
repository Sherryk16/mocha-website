import Image from "next/image";
import { Container } from "@/components/ui/layout";

type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const PARTNERS: Partner[] = [
  { name: "1883", src: "/partners/1883.png", width: 164, height: 171 },
  { name: "Monin", src: "/partners/monin.webp", width: 352, height: 89 },
  { name: "Hollander", src: "/partners/hollander.webp", width: 182, height: 182 },
  { name: "Chobani", src: "/partners/chobani.png", width: 922, height: 230 },
  { name: "Eversys", src: "/partners/eversys.webp", width: 300, height: 47 },
];

export function PartnersSection() {
  return (
    <section className="bg-coffee-50 py-16 sm:py-20">
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

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
          {PARTNERS.map((p, i) => {
            const targetHeight = 100;
            const targetWidth = Math.round(
              (targetHeight / p.height) * p.width,
            );
            return (
              <div
                key={p.name}
                className="flex h-40 items-center justify-center rounded-2xl border border-coffee-700/20 bg-white px-4 py-6 shadow-sm transition hover:border-coffee-700"
                data-partner={p.name}
                data-index={i}
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={targetWidth}
                  height={targetHeight}
                  unoptimized
                  priority
                  className="block"
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
