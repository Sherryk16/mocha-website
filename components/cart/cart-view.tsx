"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IconArrowRight, IconMinus, IconPlus, IconTrash } from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";

const SHIPPING_THRESHOLD = 250;
const SHIPPING_FLAT = 18;

export function CartView() {
  const { items, updateQuantity, removeItem, subtotal, pricingMode } =
    useCart();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = subtotal * 0.06;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-coffee-300 bg-white p-12 text-center">
        <p className="font-display text-2xl font-bold text-coffee-900">
          Your cart is empty.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-coffee-700">
          Browse the catalog and add a few items. We'll have them on a pallet
          to you by next week.
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button size="lg">
            Browse products
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-coffee-200 bg-white">
        <ul className="divide-y divide-coffee-200">
          {items.map((item) => (
            <li
              key={item.variantId}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-coffee-100">
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-coffee-500">
                  {item.brand}
                </p>
                <Link
                  href={`/products/${item.productSlug}`}
                  className="font-display text-base font-semibold text-coffee-900 hover:underline"
                >
                  {item.productName}
                </Link>
                <p className="mt-0.5 text-xs text-coffee-600">{item.variantLabel}</p>
                <p className="text-xs text-coffee-500">{item.size}</p>
              </div>
              <div className="inline-flex items-center rounded-full border border-coffee-200 bg-white text-coffee-900">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity - 1)
                  }
                  className="inline-flex h-9 w-9 items-center justify-center hover:bg-coffee-100"
                  aria-label="Decrease quantity"
                >
                  <IconMinus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity + 1)
                  }
                  className="inline-flex h-9 w-9 items-center justify-center hover:bg-coffee-100"
                  aria-label="Increase quantity"
                >
                  <IconPlus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-right sm:w-28">
                <p className="text-base font-bold text-coffee-900">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-coffee-500 hover:text-danger"
                >
                  <IconTrash className="h-3 w-3" />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow">
        <p className="text-xs font-semibold uppercase tracking-wider text-coffee-600">
          {pricingMode === "wholesale" ? "Wholesale pricing" : "Retail pricing"}
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-coffee-900">
          Order summary
        </h2>
        <dl className="mt-5 space-y-3 text-sm">
          <Row label="Subtotal" value={formatCurrency(subtotal)} />
          <Row
            label="Shipping"
            value={
              shipping === 0 ? (
                <span className="text-success">Free</span>
              ) : (
                formatCurrency(shipping)
              )
            }
            hint={
              subtotal < SHIPPING_THRESHOLD
                ? `Free at ${formatCurrency(SHIPPING_THRESHOLD)}`
                : undefined
            }
          />
          <Row label="Estimated tax (6%)" value={formatCurrency(tax)} />
        </dl>
        <div className="mt-5 border-t border-coffee-200 pt-4">
          <Row
            label="Estimated total"
            value={formatCurrency(total)}
            bold
          />
        </div>
        <Link href="/checkout" className="mt-6 block">
          <Button fullWidth size="lg">
            Checkout as guest or member
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <p className="mt-3 text-center text-xs text-coffee-600">
          You can checkout as a guest, or sign in to apply your wholesale pricing.
        </p>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  bold?: boolean;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <p className={bold ? "font-semibold text-coffee-900" : "text-coffee-700"}>
          {label}
        </p>
        {hint && <p className="text-xs text-coffee-500">{hint}</p>}
      </div>
      <p
        className={
          bold
            ? "font-display text-lg font-bold text-coffee-900"
            : "font-semibold text-coffee-900"
        }
      >
        {value}
      </p>
    </div>
  );
}
