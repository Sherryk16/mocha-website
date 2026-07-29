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
        <div className="relative h-[360px] overflow-hidden bg-black sm:h-[440px]">
          <Image
            src={brand.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <Container className="relative z-10 flex h-full items-end pb-10">
            <div className="max-w-2xl">
              <span
                className="inline-block h-1.5 w-12 rounded-full"
                style={{ background: brand.accent }}
              />
              <Eyebrow className="mt-3 text-[#5d4037]">
                {brand.origin}
              </Eyebrow>
              <h1 className="mt-2 text-4xl font-bold leading-tight text-white sm:text-5xl">
                {brand.name}
              </h1>
              <p className="mt-3 text-lg text-gray-100">{brand.tagline}</p>
              <p className="mt-4 max-w-xl text-base text-gray-100">
                {brand.description}
              </p>
            </div>
          </Container>
        </div>
      </section>
      <Container className="py-12 sm:py-16">
        <div className="mb-6 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/brands" className="hover:text-gray-900">
            Brands
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-900">{brand.name}</span>
        </div>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{products.length} products</Eyebrow>
            <Heading className="mt-2">The {brand.name} line.</Heading>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#5d4037] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#3e2723]"
          >
            All products
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-700">
            We're restocking this brand right now. Check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} kind="product" product={p} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
