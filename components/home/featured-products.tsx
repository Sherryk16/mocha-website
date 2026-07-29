import Link from "next/link";

import { CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { IconArrowRight } from "@/components/ui/icons";

export function FeaturedProducts({
  grouped,
}: {
  grouped: { slug: string; label: string; products: ReturnType<typeof import("@/lib/products").getFeaturedProducts> }[];
}) {
  return (
    <Container className="py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Featured Products</h2>
        <p className="mt-3 text-lg text-gray-200">
          Best sellers and staff favorites
        </p>
      </div>
      <div className="mt-12 space-y-12">
        {grouped.map(({ slug, label, products }) => (
          <section key={slug} id={slug}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {label}
              </h3>
              <Link
                href={`/products?category=${slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80"
              >
                View all
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-coffee-900 hover:bg-accent/90"
        >
          View all products
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
