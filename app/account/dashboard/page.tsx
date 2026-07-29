"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { IconArrowRight, IconCheck, IconShield } from "@/components/ui/icons";

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut, applications } = useAuth();
  const { setPricingMode } = useCart();

  if (!user) {
    if (typeof window !== "undefined") {
      router.replace("/account/login?return=/account/dashboard");
    }
    return null;
  }

  const userApps = applications.filter((a) => a.email === user.email);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-2xl border border-coffee-200 bg-white p-6 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-coffee-600">
          Account
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-coffee-900">
          Hello, {user.firstName}.
        </h1>
        <p className="mt-1 text-sm text-coffee-700">
          Signed in as <span className="font-semibold">{user.email}</span>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StatusPill
            ok={user.role === "wholesale" && user.approved}
            label={
              user.role === "wholesale" && user.approved
                ? "Wholesale · Approved"
                : user.role === "wholesale"
                  ? "Wholesale · Pending review"
                  : "Retail account"
            }
          />
          {user.businessName && (
            <span className="rounded-full bg-coffee-100 px-3 py-1 text-xs font-semibold text-coffee-800">
              {user.businessName}
            </span>
          )}
          {user.ein && (
            <span className="rounded-full bg-coffee-100 px-3 py-1 text-xs font-semibold text-coffee-800">
              EIN {user.ein}
            </span>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <DashCard
            href="/products"
            title="Browse the catalog"
            body="See member pricing on every product."
          />
          <DashCard
            href="/cart"
            title="Your cart"
            body="Pick up where you left off."
          />
          {user.role !== "wholesale" && (
            <DashCard
              href="/wholesale"
              title="Apply for wholesale"
              body="Verify your EIN to unlock member pricing."
              highlight
            />
          )}
          {user.role === "wholesale" && !user.approved && (
            <DashCard
              href="/contact"
              title="Contact wholesale desk"
              body="Need help with your pending application?"
            />
          )}
          {user.role === "wholesale" && user.approved && (
            <DashCard
              href="/contact"
              title="Request a standing order"
              body="Set up recurring deliveries on lock-in pricing."
              highlight
            />
          )}
        </div>

        <div className="mt-8 flex items-center justify-between rounded-xl border border-coffee-200 bg-coffee-50 p-4">
          <div>
            <p className="text-sm font-semibold text-coffee-900">
              Pricing mode
            </p>
            <p className="text-xs text-coffee-700">
              Switch between retail and member pricing anywhere on the site.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPricingMode(user.role === "wholesale" && user.approved ? "wholesale" : "retail")
            }
          >
            Toggle pricing
          </Button>
        </div>
      </section>

      <aside className="space-y-5">
        <div className="rounded-2xl border border-coffee-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-coffee-600">
            Quick links
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/account/dashboard"
                className="block rounded-md px-2 py-1.5 font-semibold text-coffee-900 hover:bg-coffee-100"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block rounded-md px-2 py-1.5 text-coffee-700 hover:bg-coffee-100"
              >
                Shop all products
              </Link>
            </li>
            <li>
              <Link
                href="/wholesale"
                className="block rounded-md px-2 py-1.5 text-coffee-700 hover:bg-coffee-100"
              >
                Wholesale info
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block rounded-md px-2 py-1.5 text-coffee-700 hover:bg-coffee-100"
              >
                Contact
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="mt-4 w-full rounded-full border border-coffee-300 px-4 py-2 text-xs font-semibold text-coffee-800 hover:bg-coffee-100"
          >
            Sign out
          </button>
        </div>
        {userApps.length > 0 && (
          <div className="rounded-2xl border border-coffee-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-coffee-600">
              Application status
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              {userApps.map((a) => (
                <li key={a.id} className="rounded-lg bg-coffee-50 p-3">
                  <p className="font-semibold text-coffee-900">
                    {a.businessName}
                  </p>
                  <p className="text-xs text-coffee-600">
                    EIN {a.ein} ·{" "}
                    <span className="font-semibold uppercase text-coffee-800">
                      {a.status}
                    </span>
                  </p>
                  <p className="text-[10px] text-coffee-500">
                    Submitted{" "}
                    {new Date(a.submittedAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={
        ok
          ? "inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success"
          : "inline-flex items-center gap-1.5 rounded-full bg-coffee-100 px-3 py-1 text-xs font-semibold text-coffee-800"
      }
    >
      {ok && <IconCheck className="h-3 w-3" />}
      {!ok && <IconShield className="h-3 w-3" />}
      {label}
    </span>
  );
}

function DashCard({
  href,
  title,
  body,
  highlight,
}: {
  href: string;
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        highlight
          ? "group flex items-start justify-between gap-3 rounded-xl border border-coffee-800 bg-coffee-800 p-4 text-coffee-50 hover:bg-coffee-900"
          : "group flex items-start justify-between gap-3 rounded-xl border border-coffee-200 bg-white p-4 hover:border-coffee-400"
      }
    >
      <div>
        <p
          className={
            highlight
              ? "font-display text-base font-semibold"
              : "font-display text-base font-semibold text-coffee-900"
          }
        >
          {title}
        </p>
        <p
          className={
            highlight ? "mt-0.5 text-xs text-coffee-100" : "mt-0.5 text-xs text-coffee-600"
          }
        >
          {body}
        </p>
      </div>
      <IconArrowRight
        className={
          highlight
            ? "h-4 w-4 text-accent"
            : "h-4 w-4 text-coffee-700 group-hover:text-coffee-900"
        }
      />
    </Link>
  );
}
