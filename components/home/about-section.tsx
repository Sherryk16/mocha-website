import Image from "next/image";
import Link from "next/link";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { IconArrowRight } from "@/components/ui/icons";

export function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden border-y border-gray-200 bg-white">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/65" />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <ScrollReveal direction="up" duration={700} className="mx-auto max-w-2xl text-center">
          <Eyebrow>Welcome to Mocha Wholesale</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Built for cafés that don't have time for surprises.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            Mocha Wholesale is a Michigan-based wholesale coffee and café
            supplier serving cafés, restaurants, bakeries and offices that
            depend on consistent products and reliable service. Founded in
            Dearborn, our company was built around the idea that quality coffee
            service starts long before the drink reaches the customer.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            From sourcing single-origin beans and matcha to supplying syrups,
            sauces and café essentials, we work closely with businesses that
            need dependable inventory, practical product recommendations and
            steady support for daily operations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-[#c2185b] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-[#9c0e4a]"
            >
              Our story
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100"
            >
              Talk to our team
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
