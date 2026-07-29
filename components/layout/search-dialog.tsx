"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { IconClose, IconSearch } from "@/components/ui/icons";
import { searchProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-coffee-900/40 px-4 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-coffee-50 shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 border-b border-coffee-200 px-5 py-4">
          <IconSearch className="h-5 w-5 text-coffee-700" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, flavors…"
            className="flex-1 bg-transparent text-base text-coffee-900 placeholder:text-coffee-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-coffee-800 hover:bg-coffee-100"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-3 py-3">
          {query.trim().length === 0 && (
            <div className="px-4 py-6 text-sm text-coffee-700">
              <p className="font-semibold">Quick links</p>
              <ul className="mt-3 space-y-2">
                {[
                  { label: "Premium Coffee", href: "/products?category=premium-coffee" },
                  { label: "Premium Sauces", href: "/products?category=premium-sauces" },
                  { label: "Premium Syrups", href: "/products?category=premium-syrups" },
                  { label: "Spreads & Fillings", href: "/products?category=spreads-and-fillings" },
                  { label: "Ceremonial Matcha", href: "/products?category=matcha" },
                ].map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={onClose}
                      className="block rounded-md px-3 py-2 hover:bg-coffee-100"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {query.trim().length > 0 && results.length === 0 && (
            <p className="px-4 py-6 text-sm text-coffee-700">
              No products match “{query}”. Try a different keyword.
            </p>
          )}
          {results.length > 0 && (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-coffee-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-coffee-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-coffee-600">
                        {p.shortDescription}
                      </div>
                    </div>
                    <div className="text-right text-xs font-semibold text-coffee-800">
                      from {formatCurrency(p.variants[0].wholesalePrice)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
