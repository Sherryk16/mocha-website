"use client";

import Link from "next/link";

import { IconClose, IconChevronDown } from "@/components/ui/icons";
import { CATEGORIES } from "@/lib/products";
import { BRANDS } from "@/lib/brands";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-coffee-900/40"
        onClick={onClose}
      />
      <aside className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-coffee-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-coffee-200 px-4 py-4">
          <span className="font-display text-lg font-bold text-coffee-900">
            Mocha Wholesale
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-coffee-900 hover:bg-coffee-100"
            aria-label="Close menu"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1 text-sm font-semibold">
            <li>
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-coffee-900 hover:bg-coffee-100"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-coffee-900 hover:bg-coffee-100"
                onClick={onClose}
              >
                About Us
              </Link>
            </li>
            <li>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-coffee-900 hover:bg-coffee-100">
                  Shop All
                  <IconChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <ul className="mt-1 ml-3 space-y-0.5 border-l border-coffee-200 pl-3 text-xs">
                  <li>
                    <Link
                      href="/products"
                      className="block rounded px-3 py-1.5 font-semibold text-coffee-700 hover:bg-coffee-100"
                      onClick={onClose}
                    >
                      All Products
                    </Link>
                  </li>
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/products?category=${c.slug}`}
                        className="block rounded px-3 py-1.5 text-coffee-700 hover:bg-coffee-100"
                        onClick={onClose}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-coffee-900 hover:bg-coffee-100">
                  Brands
                  <IconChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <ul className="mt-1 ml-3 space-y-0.5 border-l border-coffee-200 pl-3 text-xs">
                  {BRANDS.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/brands/${b.slug}`}
                        className="block rounded px-3 py-1.5 text-coffee-700 hover:bg-coffee-100"
                        onClick={onClose}
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link
                href="/wholesale"
                className="block rounded-md px-3 py-2 text-coffee-900 hover:bg-coffee-100"
                onClick={onClose}
              >
                Wholesale Application
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-coffee-900 hover:bg-coffee-100"
                onClick={onClose}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t border-coffee-200 p-4">
          <Link
            href="/account/login"
            className="mb-2 block rounded-md bg-coffee-800 px-4 py-2 text-center text-sm font-semibold text-coffee-50 hover:bg-coffee-900"
            onClick={onClose}
          >
            Sign In / Register
          </Link>
          <p className="text-xs text-coffee-600">
            Wholesale customers: sign in to see your account pricing.
          </p>
        </div>
      </aside>
    </div>
  );
}
