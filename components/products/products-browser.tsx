"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import {
  CATALOG_ITEMS,
  type CatalogItem,
} from "@/lib/catalog";

type SortKey = "featured" | "price-asc" | "price-asc-wholesale" | "name";

export function ProductsBrowser() {
  const router = useRouter();
  const params = useSearchParams();

  const [sort, setSort] = useState<SortKey>("featured");

  const sorted = useMemo<CatalogItem[]>(() => {
    const list = CATALOG_ITEMS.slice();
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.retailPrice - b.retailPrice);
        break;
      case "price-asc-wholesale":
        list.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [sort]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-3">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">
            {sorted.length}
          </span>{" "}
          {sorted.length === 1 ? "product" : "products"}
        </p>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:border-[#c2185b] focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Retail price: low → high</option>
            <option value="price-asc-wholesale">
              Wholesale price: low → high
            </option>
            <option value="name">Name: A → Z</option>
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-700">
          No products found.
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
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
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${item.slug}`}
        className="relative block aspect-square overflow-hidden bg-white"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {pricingMode === "wholesale" && (
          <span className="absolute right-2 top-2 rounded bg-[#2d6a2d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Wholesale
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link
          href={`/products/${item.slug}`}
          className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-[#c2185b] sm:text-[15px]"
        >
          {item.name}
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
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
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#c2185b] text-xs font-bold text-white transition hover:bg-[#9c0e4a] active:scale-[0.98] sm:text-sm"
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
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-black bg-white text-xs font-bold text-black transition hover:bg-black hover:text-white active:scale-[0.98] sm:text-sm"
          >
            View
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-3.5 w-3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
