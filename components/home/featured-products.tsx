"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/layout";
import { IconArrowRight } from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  CATALOG_ITEMS,
  type CatalogItem,
  type CatalogGroup,
} from "@/lib/catalog";

const GROUP_LABELS: Record<CatalogGroup, string> = {
  coffee: "Premium Coffee",
  syrups: "Premium Syrups",
  sauces: "Premium Sauces",
  spreads: "Spreads",
  "tea-and-spices": "Tea & Spices",
  mixes: "Mixes",
  ingredients: "Premium Ingredients",
};

const GROUP_ORDER: CatalogGroup[] = [
  "coffee",
  "syrups",
  "sauces",
  "spreads",
  "tea-and-spices",
  "mixes",
  "ingredients",
];

function groupItems(): { label: string; items: CatalogItem[] }[] {
  const map = new Map<CatalogGroup, CatalogItem[]>();
  for (const item of CATALOG_ITEMS) {
    const list = map.get(item.group);
    if (list) list.push(item);
    else map.set(item.group, [item]);
  }
  return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
    label: GROUP_LABELS[g],
    items: map.get(g)!,
  }));
}

function ProductCard({ item }: { item: CatalogItem }) {
  const { addItem, pricingMode } = useCart();
  const price =
    pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product: {
        slug: item.slug,
        name: item.name,
        brand: "Mocha Wholesale",
        image: item.image,
      },
      variant: {
        id: `${item.slug}-default`,
        label: item.size,
        size: item.size,
        retailPrice: item.retailPrice,
        wholesalePrice: item.wholesalePrice,
        inStock: item.inStock,
      },
      pricingMode,
      quantity: 1,
    });
  };

  return (
    <div
      data-card
      className="group flex w-[180px] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-60 sm:snap-start md:w-64"
    >
      <Link
        href={`/products/${item.slug}`}
        className="relative block aspect-square overflow-hidden bg-white"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 256px"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {pricingMode === "wholesale" && (
          <span className="absolute right-2 top-2 rounded bg-coffee-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Wholesale
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <Link
          href={`/products/${item.slug}`}
          className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-[#5d4037]"
        >
          {item.name}
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900 sm:text-lg">
            {formatCurrency(price)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500">
            {item.size}
          </span>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#5d4037] text-xs font-bold text-white transition hover:bg-[#3e2723] active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-3.5 w-3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4h2l2.5 12.5h11l2-8H6" />
              <circle cx={9} cy={20} r={1.5} />
              <circle cx={17} cy={20} r={1.5} />
            </svg>
            Add
          </button>
          <Link
            href={`/products/${item.slug}`}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-black bg-white text-xs font-bold text-black transition hover:bg-black hover:text-white active:scale-[0.98]"
          >
            View
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategorySlider({
  label,
  items,
  idx,
}: {
  label: string;
  items: CatalogItem[];
  idx: number;
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="mt-10 first:mt-8 sm:mt-14">
      <ScrollReveal direction="up">
        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
            {label}
            <span className="ml-2 text-xs font-normal text-gray-500 sm:text-sm">
              ({items.length})
            </span>
          </h3>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label={`Scroll ${label} left`}
              onClick={() => scrollBy(-1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:border-[#5d4037] hover:text-[#5d4037]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-4 w-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`Scroll ${label} right`}
              onClick={() => scrollBy(1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:border-[#5d4037] hover:text-[#5d4037]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-4 w-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div
        ref={scrollerRef}
        className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:px-0"
      >
        {items.map((item, i) => (
          <ScrollReveal
            key={item.slug}
            direction="up"
            delay={Math.min(idx * 0.04 + i * 0.02, 0.3)}
            className="shrink-0"
          >
            <ProductCard item={item} />
          </ScrollReveal>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </div>
  );
}

export function FeaturedProducts({ grouped: _grouped }: { grouped: unknown }) {
  const groups = React.useMemo(() => groupItems(), []);

  return (
    <section className="overflow-hidden bg-white py-10 sm:py-16 lg:py-20">
      <Container>
        <ScrollReveal direction="up" className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-4xl lg:text-5xl">
            <span className="text-[#5d4037]">Featured</span>{" "}
            <span className="text-gray-900">Products</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl px-2 text-sm text-gray-600 sm:mt-3 sm:text-base">
            Shop our entire catalog of premium coffee, syrups, sauces, spreads,
            spices and signature mixes.
          </p>
        </ScrollReveal>

        {groups.map((group, idx) => (
          <CategorySlider
            key={group.label}
            label={group.label}
            items={group.items}
            idx={idx}
          />
        ))}

        <ScrollReveal direction="up" className="mt-10 text-center sm:mt-14">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-[#5d4037] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:bg-[#3e2723] hover:shadow-xl sm:px-8 sm:py-3.5"
          >
            View All Products
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
