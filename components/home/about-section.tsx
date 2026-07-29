import Image from "next/image";
import Link from "next/link";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { IconArrowRight } from "@/components/ui/icons";

export function AboutSection() {
  return (
    <section className="bg-coffee-100/60">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <Eyebrow>Welcome to Mocha Wholesale</Eyebrow>
          <Heading className="mt-2 text-balance">
            Built for cafés that don't have time for surprises.
          </Heading>
          <p className="mt-4 leading-relaxed text-coffee-700">
            Mocha Wholesale is a Michigan-based wholesale coffee and café
            supplier serving cafés, restaurants, bakeries and offices that
            depend on consistent products and reliable service. Founded in
            Dearborn, our company was built around the idea that quality coffee
            service starts long before the drink reaches the customer.
          </p>
          <p className="mt-4 leading-relaxed text-coffee-700">
            From sourcing single-origin beans and matcha to supplying syrups,
            sauces and café essentials, we work closely with businesses that
            need dependable inventory, practical product recommendations and
            steady support for daily operations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-coffee-800 px-5 py-2.5 text-sm font-semibold text-coffee-50 hover:bg-coffee-900"
            >
              Our story
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-coffee-300 px-5 py-2.5 text-sm font-semibold text-coffee-800 hover:bg-coffee-100"
            >
              Talk to our team
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl smooth-shadow">
            <Image
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=80"
              alt="Coffee roasting and café supply"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden rounded-2xl bg-coffee-900 px-6 py-5 text-coffee-50 shadow-2xl sm:block">
            <p className="font-display text-3xl font-bold">12+ years</p>
            <p className="text-xs uppercase tracking-wider text-accent">
              Supplying Michigan
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
