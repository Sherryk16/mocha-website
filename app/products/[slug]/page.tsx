import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/layout";
import { PricingModeBanner } from "@/components/layout/pricing-mode-banner";
import { ProductDetail } from "@/components/products/product-detail";
import { ProductCard } from "@/components/products/product-card";
import {
  CATEGORIES,
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import {
  CATALOG_ITEMS,
  getCatalogItem,
} from "@/lib/catalog";

export async function generateStaticParams() {
  return [
    ...PRODUCTS.map((p) => ({ slug: p.slug })),
    ...CATALOG_ITEMS.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (product) {
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
  const item = getCatalogItem(slug);
  if (item) {
    return {
      title: item.name,
      description: item.shortDescription,
      openGraph: {
        title: item.name,
        description: item.shortDescription,
        images: [{ url: item.image }],
      },
    };
  }
  return { title: "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const catalog = getCatalogItem(slug);
  if (!product && !catalog) notFound();

  const breadcrumbLabel = product?.category ?? "";
  const breadcrumbLabelText =
    CATEGORIES.find((c) => c.slug === breadcrumbLabel)?.label ?? "";

  const related = product
    ? getRelatedProducts(product).slice(0, 4)
    : catalog
      ? CATALOG_ITEMS.filter(
          (c) => c.slug !== catalog.slug && c.group === catalog.group
        )
          .concat(
            CATALOG_ITEMS.filter(
              (c) => c.slug !== catalog.slug && c.group !== catalog.group
            )
          )
          .slice(0, 4)
      : [];

  const groupLabels: Record<string, string> = {
    coffee: "Premium Coffee",
    syrups: "Premium Syrups",
    sauces: "Premium Sauces",
    spreads: "Spreads",
    "tea-and-spices": "Tea & Spices",
    mixes: "Mixes",
    ingredients: "Premium Ingredients",
  };
  const catalogGroupLabel = catalog ? groupLabels[catalog.group] : "";

  const displayCategoryLabel = product
    ? breadcrumbLabelText
    : catalogGroupLabel;

  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <Container className="py-6 sm:py-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#c2185b] transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/products"
              className="hover:text-[#c2185b] transition-colors"
            >
              Products
            </Link>
            {displayCategoryLabel && (
              <>
                <span className="text-gray-300">/</span>
                <Link
                  href={
                    catalog
                      ? `/products?group=${catalog.group}`
                      : `/products?category=${breadcrumbLabel}`
                  }
                  className="hover:text-[#c2185b] transition-colors"
                >
                  {displayCategoryLabel}
                </Link>
              </>
            )}
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-900">
              {product?.name ?? catalog?.name}
            </span>
          </nav>
        </Container>
      </section>
      <Container className="py-10 sm:py-12">
        <PricingModeBanner />
        <div className="mt-6">
          {product ? (
            <ProductDetail mode="product" product={product} />
          ) : catalog ? (
            <ProductDetail mode="catalog" item={catalog} />
          ) : null}
        </div>
      </Container>
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-white">
          <Container className="py-12 sm:py-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c2185b]">
                  You may also like
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  More from {displayCategoryLabel}
                </h2>
              </div>
              <Link
                href={
                  catalog
                    ? `/products?group=${catalog.group}`
                    : `/products?category=${breadcrumbLabel}`
                }
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:-translate-y-0.5 hover:border-[#c2185b] hover:text-[#c2185b]"
              >
                See all →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) =>
                "variants" in p ? (
                  <ProductCard
                    key={p.slug}
                    kind="product"
                    product={p as import("@/lib/products").Product}
                  />
                ) : (
                  <ProductCard
                    key={p.slug}
                    kind="catalog"
                    item={p as import("@/lib/catalog").CatalogItem}
                  />
                )
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
