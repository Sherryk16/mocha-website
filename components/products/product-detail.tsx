"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Button, LinkButton } from "@/components/ui/button";
import {
  IconArrowRight,
  IconCart,
  IconCheck,
  IconShield,
  IconTruck,
  IconLeaf,
} from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/products";
import type { CatalogItem } from "@/lib/catalog";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type DetailProps =
  | { mode: "product"; product: Product }
  | { mode: "catalog"; item: CatalogItem };

export function ProductDetail(props: DetailProps) {
  const isProduct = props.mode === "product";
  const name = isProduct ? props.product.name : props.item.name;
  const image = isProduct ? props.product.image : props.item.image;
  const shortDescription = isProduct
    ? props.product.shortDescription
    : props.item.shortDescription;
  const description = isProduct ? props.product.description : props.item.description;
  const origin = isProduct ? props.product.origin : props.item.origin;
  const tastingNotes = isProduct
    ? props.product.tastingNotes
    : props.item.tastingNotes;

  const variants = useMemo(() => {
    if (isProduct) return props.product.variants;
    const item = props.item;
    return [
      {
        id: `${item.slug}-default`,
        label: item.size,
        size: item.size,
        retailPrice: item.retailPrice,
        wholesalePrice: item.wholesalePrice,
        inStock: item.inStock,
      },
    ];
  }, [props, isProduct]);

  const slug = isProduct ? props.product.slug : props.item.slug;
  const category = useMemo(() => {
    if (isProduct) return props.product.category;
    return "Mocha Wholesale";
  }, [props, isProduct]);

  return (
    <DetailBody
      slug={slug}
      name={name}
      image={image}
      shortDescription={shortDescription}
      description={description}
      origin={origin}
      tastingNotes={tastingNotes}
      category={category}
      variants={variants}
    />
  );
}

function DetailBody({
  slug,
  name,
  image,
  shortDescription,
  description,
  origin,
  tastingNotes,
  category,
  variants,
}: {
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  description: string;
  origin?: string;
  tastingNotes?: string[];
  category: string;
  variants: {
    id: string;
    label: string;
    size: string;
    retailPrice: number;
    wholesalePrice: number;
    inStock: number;
  }[];
}) {
  const [variantId, setVariantId] = useState(variants[0].id);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const { addItem, pricingMode } = useCart();

  const variant = variants.find((v) => v.id === variantId)!;
  const unitPrice =
    pricingMode === "wholesale"
      ? variant.wholesalePrice
      : variant.retailPrice;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      {/* ── Left: image gallery ── */}
      <ScrollReveal direction="left" duration={700}>
        <div className="lg:sticky lg:top-32">
          <div
            className={cn(
              "group relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-500",
              zoom ? "shadow-2xl ring-2 ring-[#5d4037]" : "hover:shadow-xl"
            )}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <Image
              src={image}
              alt={name}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "object-contain p-8 transition-transform duration-700 ease-out",
                zoom && "scale-110"
              )}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-coffee-700/10">
              <IconCheck className="h-4 w-4 text-coffee-700" />
            </span>
            <span className="font-medium">
              In stock · Same-week shipping from Dearborn, MI
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Right: details ── */}
      <div>
        <ScrollReveal direction="right" duration={700}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-700">
            {category || "Mocha Wholesale"}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            {shortDescription}
          </p>
        </ScrollReveal>

        {/* Pricing block */}
        <ScrollReveal direction="up" delay={120} duration={700}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-baseline gap-3 p-5">
              <p className="text-4xl font-extrabold text-gray-900">
                {formatCurrency(unitPrice)}
              </p>
              <span className="text-sm font-medium text-gray-600">
                per {variant.size}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-600">
              <span>{variant.size}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold",
                  variant.inStock > 100
                    ? "bg-coffee-700/10 text-coffee-700"
                    : variant.inStock > 0
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-700"
                )}
              >
                <IconCheck className="h-3 w-3" />
                {variant.inStock > 100
                  ? "In stock"
                  : variant.inStock > 0
                    ? `Only ${variant.inStock} left`
                    : "Backorder"}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Variants */}
        {variants.length > 1 && (
          <ScrollReveal direction="up" delay={180} duration={700}>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                Choose size
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      "flex items-start justify-between gap-2 rounded-xl border p-3 text-left transition-all duration-200",
                      v.id === variantId
                        ? "border-[#5d4037] bg-[#5d4037]/5 ring-1 ring-[#5d4037] scale-[1.01]"
                        : "border-gray-200 bg-white hover:border-gray-400 hover:scale-[1.01]"
                    )}
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {v.label}
                      </p>
                      <p className="text-xs text-gray-600">{v.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(
                          pricingMode === "wholesale"
                            ? v.wholesalePrice
                            : v.retailPrice
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Quantity + Add to cart */}
        <ScrollReveal direction="up" delay={240} duration={700}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-11 w-11 text-lg font-bold text-gray-700 transition hover:bg-gray-100 active:scale-95"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-bold text-gray-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="h-11 w-11 text-lg font-bold text-gray-700 transition hover:bg-gray-100 active:scale-95"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              onClick={() =>
                addItem({
                  product: {
                    slug,
                    name,
                    brand: "Mocha Wholesale",
                    image,
                  },
                  variant,
                  pricingMode,
                  quantity: qty,
                })
              }
              className="flex-1 sm:flex-none"
            >
              <IconCart className="h-4 w-4" />
              Add to cart · {formatCurrency(unitPrice * qty)}
            </Button>

            <LinkButton href="/wholesale" variant="outline" size="lg">
              <IconShield className="h-4 w-4" />
              Apply for wholesale
            </LinkButton>
          </div>
        </ScrollReveal>

        {/* Tasting + Origin pills */}
        {(origin || (tastingNotes && tastingNotes.length > 0)) && (
          <ScrollReveal direction="up" delay={300} duration={700}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {origin && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Origin
                  </p>
                  <p className="mt-2 text-base font-semibold text-gray-900">
                    {origin}
                  </p>
                </div>
              )}
              {tastingNotes && tastingNotes.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Tasting notes
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {tastingNotes.map((n) => (
                      <li
                        key={n}
                        className="rounded-full bg-[#5d4037]/10 px-3 py-1 text-xs font-semibold text-[#5d4037] transition-colors hover:bg-[#5d4037] hover:text-white"
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Description */}
        <ScrollReveal direction="up" delay={360} duration={700}>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
              Description
            </p>
            <p className="mt-2 text-base leading-relaxed text-gray-800">
              {description}
            </p>
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal direction="up" delay={420} duration={700}>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Benefit
              icon={<IconTruck className="h-5 w-5" />}
              title="Same-week delivery"
              body="Ships from our Dearborn facility within 1 business day."
            />
            <Benefit
              icon={<IconLeaf className="h-5 w-5" />}
              title="Bulk discounts"
              body="Ask about volume tiers and standing-order pricing."
            />
            <Benefit
              icon={<IconShield className="h-5 w-5" />}
              title="Quality guarantee"
              body="We replace anything that doesn't meet your quality bar."
            />
          </div>
        </ScrollReveal>

        {/* Wholesale CTA */}
        <ScrollReveal direction="up" delay={480} duration={700}>
          <LinkButton
            href="/wholesale"
            variant="primary"
            size="lg"
            className="mt-8 w-full"
          >
            <IconShield className="h-4 w-4" />
            Become a wholesale partner
            <IconArrowRight className="h-4 w-4" />
          </LinkButton>
        </ScrollReveal>
      </div>
    </div>
  );
}

function Benefit({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#5d4037]/10 text-[#5d4037] transition-colors duration-300 group-hover:bg-[#5d4037] group-hover:text-white">
        {icon}
      </div>
      <p className="mt-3 text-sm font-bold text-gray-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-gray-700">{body}</p>
    </div>
  );
}
