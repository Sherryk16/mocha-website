import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <>
      <section className="bg-coffee-100/40">
        <Container className="py-10">
          <Eyebrow>Checkout</Eyebrow>
          <Heading className="mt-2">Almost there.</Heading>
          <p className="mt-3 max-w-xl text-sm text-coffee-700">
            Guest checkout is fine for retail orders. Sign in to apply approved
            wholesale pricing and view standing orders.
          </p>
          <nav className="mt-3 text-xs text-coffee-600">
            <Link href="/" className="hover:text-coffee-900">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/cart" className="hover:text-coffee-900">
              Cart
            </Link>
            <span className="mx-1.5">/</span>
            <span>Checkout</span>
          </nav>
        </Container>
      </section>
      <Container className="py-10 sm:py-12">
        <CheckoutView />
      </Container>
    </>
  );
}
