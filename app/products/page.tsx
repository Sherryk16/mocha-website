import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { PricingModeBanner } from "@/components/layout/pricing-mode-banner";
import { ProductsBrowser } from "@/components/products/products-browser";

export const metadata: Metadata = {
  title: "Shop all products",
  description:
    "Wholesale coffee, sauces, syrups, spreads, matcha and tea. Free shipping on standing orders over $250.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <Container className="py-12 sm:py-16">
          <Eyebrow>Catalog</Eyebrow>
          <Heading className="mt-2">Shop all products.</Heading>
          <p className="mt-3 max-w-xl text-gray-700">
            Premium coffee, syrups, sauces, spreads, spices and signature
            mixes. Approved wholesale accounts see member pricing in the cart.
          </p>
          <nav className="mt-4 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Shop all products</span>
          </nav>
        </Container>
      </section>
      <Container className="py-10 sm:py-12">
        <PricingModeBanner />
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-2xl bg-gray-100"
                  />
                ))}
              </div>
            }
          >
            <ProductsBrowser />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
