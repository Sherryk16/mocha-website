"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  IconClose,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    pricingMode,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {pricingMode === "wholesale"
                ? "Wholesale pricing"
                : "Retail pricing"}
            </p>
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-lg text-gray-900">Your cart is empty.</p>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Add a few of our wholesale favorites and we'll have them on a
                pallet to you by next week.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="mt-5 inline-flex h-11 items-center rounded-full bg-[#5d4037] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#3e2723]"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.productSlug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-gray-900 hover:text-[#5d4037]"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-xs text-gray-600">
                          {item.variantLabel}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                        aria-label={`Remove ${item.productName}`}
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-gray-200 bg-white text-gray-900">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          className="inline-flex h-8 w-8 items-center justify-center hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          className="inline-flex h-8 w-8 items-center justify-center hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Shipping & taxes calculated at checkout.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCart}>
                <Button variant="outline" fullWidth>
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart}>
                <Button fullWidth>Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
