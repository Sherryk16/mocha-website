import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <Container className="py-10">
          <Eyebrow>Cart</Eyebrow>
          <Heading className="mt-2">Your wholesale order.</Heading>
          <nav className="mt-3 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Cart</span>
          </nav>
        </Container>
      </section>
      <Container className="py-10 sm:py-12">
        <CartView />
      </Container>
    </>
  );
}
