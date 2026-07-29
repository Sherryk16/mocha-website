"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { IconArrowRight, IconCheck, IconLock } from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { cn, formatCurrency } from "@/lib/utils";

const SHIPPING_THRESHOLD = 250;
const SHIPPING_FLAT = 18;

type CheckoutMode = "guest" | "signin";

export function CheckoutView() {
  const { items, subtotal, pricingMode, clear } = useCart();
  const { user } = useAuth();
  const [mode, setMode] = useState<CheckoutMode>(user ? "signin" : "guest");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = subtotal * 0.06;
  const total = subtotal + shipping + tax;

  async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 800));
    setOrderId(`MW-${Math.floor(100000 + Math.random() * 900000)}`);
    clear();
    setPlacing(false);
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-coffee-200 bg-white p-10 text-center smooth-shadow">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success text-white">
          <IconCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-coffee-900">
          Order placed.
        </h2>
        <p className="mt-2 text-sm text-coffee-700">
          Thanks! Your order <span className="font-semibold">{orderId}</span>{" "}
          is in. A confirmation will land in your inbox shortly. Our wholesale
          team will reach out to confirm delivery.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-coffee-800 px-6 text-sm font-semibold text-coffee-50 hover:bg-coffee-900"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-coffee-300 bg-white p-12 text-center">
        <p className="font-display text-2xl font-bold text-coffee-900">
          Nothing to checkout.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-coffee-700">
          Your cart is empty. Add a few items and come back.
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button size="lg">Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <form onSubmit={placeOrder} className="space-y-8">
        <section className="rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow">
          <h2 className="font-display text-xl font-bold text-coffee-900">
            Checkout type
          </h2>
          <p className="mt-1 text-sm text-coffee-600">
            Guests can checkout right away. Sign in to apply approved wholesale
            pricing and view your standing orders.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("guest")}
              className={cn(
                "rounded-xl border p-4 text-left transition",
                mode === "guest"
                  ? "border-coffee-800 bg-coffee-50 ring-1 ring-coffee-800"
                  : "border-coffee-200 bg-white hover:border-coffee-400"
              )}
            >
              <p className="text-sm font-semibold text-coffee-900">
                Checkout as guest
              </p>
              <p className="mt-1 text-xs text-coffee-600">
                Retail pricing. No account required.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={cn(
                "rounded-xl border p-4 text-left transition",
                mode === "signin"
                  ? "border-coffee-800 bg-coffee-50 ring-1 ring-coffee-800"
                  : "border-coffee-200 bg-white hover:border-coffee-400"
              )}
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-coffee-900">
                <IconLock className="h-3.5 w-3.5" />
                Sign in for member pricing
              </p>
              <p className="mt-1 text-xs text-coffee-600">
                {user
                  ? `Signed in as ${user.email}`
                  : "Apply wholesale pricing & standing orders."}
              </p>
              {!user && mode === "signin" && (
                <Link
                  href="/account/login?return=/checkout"
                  className="mt-2 inline-block text-xs font-semibold text-coffee-800 underline"
                >
                  Sign in / Register →
                </Link>
              )}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow">
          <h2 className="font-display text-xl font-bold text-coffee-900">
            Contact information
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              name="email"
              type="email"
              label="Email"
              required
              defaultValue={user?.email}
              placeholder="you@business.com"
            />
            <Input
              name="phone"
              type="tel"
              label="Phone"
              required
              placeholder="(555) 555-5555"
            />
          </div>
          {mode === "guest" && (
            <p className="mt-3 text-xs text-coffee-600">
              We'll only email you about this order. Create an account at any
              time to manage standing orders.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow">
          <h2 className="font-display text-xl font-bold text-coffee-900">
            Business information
          </h2>
          <p className="mt-1 text-sm text-coffee-600">
            Required for delivery. {mode === "guest" && "We use this to verify your order with our wholesale desk."}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              name="businessName"
              label="Business name"
              required
              placeholder="Café / Restaurant / Office"
            />
            <Input
              name="contactName"
              label="Contact name"
              required
              placeholder="Jane Doe"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Input
              name="address"
              label="Street address"
              required
              className="sm:col-span-2"
              placeholder="15401 Century Dr."
            />
            <Input name="city" label="City" required placeholder="Dearborn" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Select
              name="state"
              label="State"
              required
              defaultValue="MI"
              options={US_STATES}
            />
            <Input name="zip" label="ZIP" required placeholder="48120" />
            <Input
              name="deliveryNotes"
              label="Delivery notes"
              placeholder="Loading dock #3"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow">
          <h2 className="font-display text-xl font-bold text-coffee-900">
            Payment
          </h2>
          <p className="mt-1 text-sm text-coffee-600">
            Net-30 terms available for approved wholesale accounts. New
            customers pay by card.
          </p>
          <div className="mt-4 grid gap-4">
            <label className="flex items-center gap-3 rounded-xl border border-coffee-200 bg-coffee-50 p-4">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                defaultChecked
                className="h-4 w-4 accent-coffee-800"
              />
              <div>
                <p className="text-sm font-semibold text-coffee-900">
                  Credit / Debit Card
                </p>
                <p className="text-xs text-coffee-600">
                  Visa, Mastercard, Amex, Discover, PayPal.
                </p>
              </div>
            </label>
            <label
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4",
                user?.role === "wholesale" && user.approved
                  ? "border-coffee-200 bg-white"
                  : "border-coffee-200 bg-coffee-50 opacity-70"
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="net30"
                disabled={!(user?.role === "wholesale" && user.approved)}
                className="h-4 w-4 accent-coffee-800"
              />
              <div>
                <p className="text-sm font-semibold text-coffee-900">
                  Net-30 terms
                </p>
                <p className="text-xs text-coffee-600">
                  Available for approved wholesale accounts.
                </p>
              </div>
            </label>
          </div>
        </section>

        <div className="flex items-center justify-between gap-4">
          <Link
            href="/cart"
            className="text-sm font-semibold text-coffee-700 hover:text-coffee-900"
          >
            ← Back to cart
          </Link>
          <Button type="submit" size="lg" disabled={placing}>
            {placing ? "Placing order…" : `Place order · ${formatCurrency(total)}`}
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <aside className="rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow">
        <p className="text-xs font-semibold uppercase tracking-wider text-coffee-600">
          {pricingMode === "wholesale" ? "Wholesale pricing" : "Retail pricing"}
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-coffee-900">
          Order summary
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.variantId}
              className="flex items-center gap-3 text-sm"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-coffee-100">
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-coffee-900">
                  {item.productName}
                </p>
                <p className="text-[11px] text-coffee-600">
                  {item.variantLabel} × {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-coffee-900">
                {formatCurrency(item.unitPrice * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-coffee-200 pt-4 text-sm">
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
          />
          <Row label="Tax (6%)" value={formatCurrency(tax)} />
          <Row
            label="Total"
            value={formatCurrency(total)}
            bold
          />
        </dl>
        <p className="mt-4 text-xs text-coffee-600">
          Final shipping & tax will be confirmed by our wholesale desk within
          one business day.
        </p>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <p className={bold ? "font-semibold text-coffee-900" : "text-coffee-700"}>
        {label}
      </p>
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

const US_STATES = [
  { value: "MI", label: "Michigan" },
  { value: "OH", label: "Ohio" },
  { value: "IN", label: "Indiana" },
  { value: "IL", label: "Illinois" },
  { value: "WI", label: "Wisconsin" },
  { value: "PA", label: "Pennsylvania" },
  { value: "NY", label: "New York" },
  { value: "Other", label: "Other US state" },
];
