"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/products/product-card";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { BRANDS, type BrandSlug } from "@/lib/brands";
import { IconChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const ROAST_FILTERS = ["Light", "Medium", "Medium-Dark", "Dark"] as const;

type SortKey = "featured" | "price-asc" | "price-asc-wholesale" | "name";

export function ProductsBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category") as Category | null;
  const brand = params.get("brand") as BrandSlug | null;

  const [roast, setRoast] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");
  const [open, setOpen] = useState<string | null>("category");

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (brand) list = list.filter((p) => p.brand === brand);
    if (roast) list = list.filter((p) => p.roastLevel === roast);
    switch (sort) {
      case "price-asc":
        list.sort(
          (a, b) =>
            a.variants[0].retailPrice - b.variants[0].retailPrice
        );
        break;
      case "price-asc-wholesale":
        list.sort(
          (a, b) =>
            a.variants[0].wholesalePrice - b.variants[0].wholesalePrice
        );
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
    return list;
  }, [category, brand, roast, sort]);

  function setQuery(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/products?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-3 lg:sticky lg:top-32 lg:self-start">
        <FilterGroup
          title="Category"
          open={open === "category"}
          onToggle={() => setOpen(open === "category" ? null : "category")}
        >
          <ul className="space-y-1.5 text-sm">
            <li>
              <FilterButton
                active={!category}
                onClick={() => setQuery("category", null)}
              >
                All categories
              </FilterButton>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <FilterButton
                  active={category === c.slug}
                  onClick={() => setQuery("category", c.slug)}
                >
                  {c.label}
                </FilterButton>
              </li>
            ))}
          </ul>
        </FilterGroup>
        <FilterGroup
          title="Brand"
          open={open === "brand"}
          onToggle={() => setOpen(open === "brand" ? null : "brand")}
        >
          <ul className="space-y-1.5 text-sm">
            <li>
              <FilterButton
                active={!brand}
                onClick={() => setQuery("brand", null)}
              >
                All brands
              </FilterButton>
            </li>
            {BRANDS.map((b) => (
              <li key={b.slug}>
                <FilterButton
                  active={brand === b.slug}
                  onClick={() => setQuery("brand", b.slug)}
                >
                  {b.name}
                </FilterButton>
              </li>
            ))}
          </ul>
        </FilterGroup>
        <FilterGroup
          title="Roast level"
          open={open === "roast"}
          onToggle={() => setOpen(open === "roast" ? null : "roast")}
        >
          <ul className="space-y-1.5 text-sm">
            <li>
              <FilterButton
                active={!roast}
                onClick={() => setRoast(null)}
              >
                Any roast
              </FilterButton>
            </li>
            {ROAST_FILTERS.map((r) => (
              <li key={r}>
                <FilterButton
                  active={roast === r}
                  onClick={() => setRoast(r)}
                >
                  {r}
                </FilterButton>
              </li>
            ))}
          </ul>
        </FilterGroup>
      </aside>
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-coffee-700">
            <span className="font-semibold text-coffee-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>
          <label className="flex items-center gap-2 text-sm text-coffee-700">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-coffee-200 bg-white px-2.5 py-1.5 text-sm text-coffee-900 focus:border-coffee-500 focus:outline-none"
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
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-coffee-300 bg-white p-10 text-center text-coffee-700">
            No products match these filters. Try clearing one.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-coffee-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-coffee-700">
          {title}
        </span>
        <IconChevronDown
          className={cn(
            "h-4 w-4 text-coffee-700 transition",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="border-t border-coffee-200 px-4 py-3">{children}</div>}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full rounded-md px-3 py-1.5 text-left text-sm transition",
        active
          ? "bg-coffee-800 font-semibold text-coffee-50"
          : "text-coffee-800 hover:bg-coffee-100"
      )}
    >
      {children}
    </button>
  );
}
