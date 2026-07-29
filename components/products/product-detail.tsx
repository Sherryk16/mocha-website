"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { IconCart, IconCheck, IconShield } from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { cn, formatCurrency } from "@/lib/utils";
import { BRANDS_BY_SLUG } from "@/lib/brands";
import type { Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { addItem, pricingMode, setPricingMode } = useCart();
  const { user } = useAuth();

  const variant = product.variants.find((v) => v.id === variantId)!;
  const brand = BRANDS_BY_SLUG[product.brand];
  const isApproved = user?.role === "wholesale" && user.approved;
  const images = [product.image, ...(product.gallery ?? [])];
  const savings = variant.retailPrice - variant.wholesalePrice;

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-coffee-100 smooth-shadow">
          <Image
            src={images[galleryIndex]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setGalleryIndex(i)}
                className={cn(
                  "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-coffee-100 transition",
                  i === galleryIndex
                    ? "border-coffee-800"
                    : "border-transparent hover:border-coffee-300"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-600">
          {brand.name}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-coffee-900 sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-coffee-700">{product.shortDescription}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-coffee-200 bg-white p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-coffee-600">
            Pricing
          </span>
          <div className="inline-flex rounded-full bg-coffee-100 p-1">
            <button
              type="button"
              onClick={() => setPricingMode("retail")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                pricingMode === "retail"
                  ? "bg-coffee-800 text-coffee-50"
                  : "text-coffee-700"
              )}
            >
              Retail
            </button>
            <button
              type="button"
              onClick={() => isApproved && setPricingMode("wholesale")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                pricingMode === "wholesale"
                  ? "bg-accent text-coffee-900"
                  : "text-coffee-700",
                !isApproved && "cursor-not-allowed opacity-60"
              )}
              title={
                isApproved
                  ? undefined
                  : "Apply for a wholesale account to unlock member pricing"
              }
            >
              Wholesale
            </button>
          </div>
          {!isApproved && (
            <span className="ml-1 text-xs text-coffee-600">
              <a href="/wholesale" className="font-semibold text-coffee-800 underline">
                Apply
              </a>{" "}
              for a wholesale account to unlock pricing.
            </span>
          )}
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <p className="font-display text-4xl font-bold text-coffee-900">
            {formatCurrency(
              pricingMode === "wholesale"
                ? variant.wholesalePrice
                : variant.retailPrice
            )}
          </p>
          {pricingMode === "wholesale" && (
            <p className="text-sm text-coffee-500 line-through">
              {formatCurrency(variant.retailPrice)}
            </p>
          )}
          {pricingMode === "retail" && isApproved && (
            <p className="text-sm text-coffee-500">
              Member price {formatCurrency(variant.wholesalePrice)} · save{" "}
              {formatCurrency(savings)}
            </p>
          )}
        </div>
        <p className="mt-1 text-xs text-coffee-500">{variant.size}</p>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
            Choose size
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "flex items-start justify-between gap-2 rounded-xl border p-3 text-left transition",
                  v.id === variantId
                    ? "border-coffee-800 bg-coffee-50 ring-1 ring-coffee-800"
                    : "border-coffee-200 bg-white hover:border-coffee-400"
                )}
              >
                <div>
                  <p className="text-sm font-semibold text-coffee-900">
                    {v.label}
                  </p>
                  <p className="text-xs text-coffee-600">{v.size}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-coffee-900">
                    {formatCurrency(
                      pricingMode === "wholesale"
                        ? v.wholesalePrice
                        : v.retailPrice
                    )}
                  </p>
                  {pricingMode === "retail" && isApproved && (
                    <p className="text-[10px] text-coffee-500 line-through">
                      {formatCurrency(v.wholesalePrice)}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-coffee-500">
                    {v.inStock > 100
                      ? "In stock"
                      : v.inStock > 0
                        ? `${v.inStock} left`
                        : "Backorder"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() =>
              addItem({
                product: {
                  slug: product.slug,
                  name: product.name,
                  brand: brand.name,
                  image: product.image,
                },
                variant,
                pricingMode,
              })
            }
          >
            <IconCart className="h-4 w-4" />
            Add to cart
          </Button>
          <Button variant="outline" size="lg">
            <IconShield className="h-4 w-4" />
            Request standing order
          </Button>
        </div>

        <div className="mt-10 grid gap-6 border-t border-coffee-200 pt-8 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
              Description
            </p>
            <p className="mt-2 leading-relaxed text-coffee-800">
              {product.description}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {product.origin && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
                  Origin
                </p>
                <p className="mt-1 text-coffee-900">{product.origin}</p>
              </div>
            )}
            {product.roastLevel && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
                  Roast level
                </p>
                <p className="mt-1 text-coffee-900">{product.roastLevel}</p>
              </div>
            )}
            {product.tastingNotes && product.tastingNotes.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
                  Tasting notes
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {product.tastingNotes.map((n) => (
                    <li
                      key={n}
                      className="rounded-full bg-coffee-100 px-3 py-1 text-xs font-semibold text-coffee-800"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.ingredients && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
                  Ingredients
                </p>
                <p className="mt-1 text-coffee-900">{product.ingredients}</p>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-coffee-200 bg-coffee-50 p-4 text-xs text-coffee-700">
            <p className="flex items-center gap-2 font-semibold text-coffee-900">
              <IconCheck className="h-4 w-4 text-success" />
              Wholesale terms
            </p>
            <p className="mt-1">
              {isApproved
                ? "Your wholesale account is active — member pricing is applied automatically."
                : "Approved wholesale accounts see this product at member pricing and can request standing orders. Apply with your EIN to get started."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
