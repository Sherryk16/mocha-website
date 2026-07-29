import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container, Eyebrow } from "@/components/ui/layout";
import { PricingModeBanner } from "@/components/layout/pricing-mode-banner";
import { ProductDetail } from "@/components/products/product-detail";
import { ProductCard } from "@/components/products/product-card";
import {
  CATEGORIES,
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { BRANDS_BY_SLUG } from "@/lib/brands";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const brand = BRANDS_BY_SLUG[product.brand];
  const category = CATEGORIES.find((c) => c.slug === product.category);
  const related = getRelatedProducts(product);

  return (
    <>
      <section className="bg-coffee-100/40">
        <Container className="py-8">
          <nav className="text-xs text-coffee-600">
            <Link href="/" className="hover:text-coffee-900">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/products" className="hover:text-coffee-900">
              Products
            </Link>
            <span className="mx-1.5">/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-coffee-900"
            >
              {category?.label}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-coffee-900">{product.name}</span>
          </nav>
          <p className="mt-3 text-sm text-coffee-700">
            <Eyebrow>{brand.name}</Eyebrow>
          </p>
        </Container>
      </section>
      <Container className="py-10 sm:py-12">
        <PricingModeBanner />
        <div className="mt-8">
          <ProductDetail product={product} />
        </div>
      </Container>
      {related.length > 0 && (
        <section className="bg-coffee-100/40">
          <Container className="py-12 sm:py-16">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold text-coffee-900">
                More from {category?.label}
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-sm font-semibold text-coffee-700 hover:text-coffee-900"
              >
                See all →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
