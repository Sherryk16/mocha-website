"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (!user) {
      router.replace("/account/login?return=/account/dashboard");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const userApps = applications.filter((a) => a.email === user.email);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Account
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">
          Hello, {user.firstName}.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
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
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
              {user.businessName}
            </span>
          )}
          {user.ein && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
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

        <div className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Pricing mode</p>
            <p className="text-xs text-gray-600">
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
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Quick links
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/account/dashboard"
                className="block rounded-md px-2 py-1.5 font-semibold text-gray-900 hover:bg-gray-100"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
              >
                Shop all products
              </Link>
            </li>
            <li>
              <Link
                href="/wholesale"
                className="block rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
              >
                Wholesale info
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
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
            className="mt-4 w-full rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
        {userApps.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Application status
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              {userApps.map((a) => (
                <li key={a.id} className="rounded-lg bg-gray-50 p-3">
                  <p className="font-semibold text-gray-900">
                    {a.businessName}
                  </p>
                  <p className="text-xs text-gray-600">
                    EIN {a.ein} ·{" "}
                    <span className="font-semibold uppercase text-gray-800">
                      {a.status}
                    </span>
                  </p>
                  <p className="text-[10px] text-gray-500">
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
          ? "inline-flex items-center gap-1.5 rounded-full bg-[#2d6a2d]/10 px-3 py-1 text-xs font-semibold text-[#2d6a2d]"
          : "inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800"
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
          ? "group flex items-start justify-between gap-3 rounded-xl border border-[#c2185b] bg-[#c2185b] p-4 text-white shadow-sm transition hover:bg-[#9c0e4a]"
          : "group flex items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#c2185b]"
      }
    >
      <div>
        <p
          className={
            highlight
              ? "text-base font-semibold"
              : "text-base font-semibold text-gray-900"
          }
        >
          {title}
        </p>
        <p
          className={
            highlight ? "mt-0.5 text-xs text-white/80" : "mt-0.5 text-xs text-gray-600"
          }
        >
          {body}
        </p>
      </div>
      <IconArrowRight
        className={
          highlight
            ? "h-4 w-4 text-white"
            : "h-4 w-4 text-gray-400 group-hover:text-[#c2185b]"
        }
      />
    </Link>
  );
}
