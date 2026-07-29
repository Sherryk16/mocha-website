import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { ProductCard } from "@/components/products/product-card";
import { IconArrowRight } from "@/components/ui/icons";
import { BRANDS, BRANDS_BY_SLUG } from "@/lib/brands";
import { getProductsByBrand } from "@/lib/products";

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS_BY_SLUG[slug as keyof typeof BRANDS_BY_SLUG];
  if (!brand) return { title: "Brand" };
  return {
    title: brand.name,
    description: brand.description,
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = BRANDS_BY_SLUG[slug as keyof typeof BRANDS_BY_SLUG];
  if (!brand) notFound();

  const products = getProductsByBrand(brand.slug);

  return (
    <>
      <section className="relative">
        <div className="relative h-[360px] overflow-hidden bg-coffee-900 sm:h-[440px]">
          <Image
            src={brand.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/85 via-coffee-900/60 to-coffee-900/30" />
          <Container className="relative z-10 flex h-full items-end pb-10">
            <div className="max-w-2xl">
              <span
                className="inline-block h-1.5 w-12 rounded-full"
                style={{ background: brand.accent }}
              />
              <Eyebrow className="mt-3 text-accent">{brand.origin}</Eyebrow>
              <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-coffee-50 sm:text-5xl">
                {brand.name}
              </h1>
              <p className="mt-3 font-display text-lg text-coffee-100">
                {brand.tagline}
              </p>
              <p className="mt-4 max-w-xl text-base text-coffee-100">
                {brand.description}
              </p>
            </div>
          </Container>
        </div>
      </section>
      <Container className="py-12 sm:py-16">
        <div className="mb-6 text-xs text-coffee-600">
          <Link href="/" className="hover:text-coffee-900">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/brands" className="hover:text-coffee-900">
            Brands
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-coffee-900">{brand.name}</span>
        </div>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{products.length} products</Eyebrow>
            <Heading className="mt-2">The {brand.name} line.</Heading>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-coffee-800 px-5 py-2.5 text-sm font-semibold text-coffee-50 hover:bg-coffee-900"
          >
            All products
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-coffee-300 bg-white p-10 text-center text-coffee-700">
            We're restocking this brand right now. Check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
