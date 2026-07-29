"use client";

import { ShieldCheck, Store } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function PricingModeBanner() {
  const { pricingMode, setPricingMode } = useCart();
  const { user } = useAuth();
  const isApproved = user?.role === "wholesale" && user.approved;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2d6a2d]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2d6a2d]">
            <ShieldCheck size={13} />
            Pricing
          </span>
          <p className="text-sm text-gray-800">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {pricingMode === "wholesale" ? "wholesale" : "retail"}
            </span>{" "}
            pricing.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
          <button
            type="button"
            onClick={() => setPricingMode("retail")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
              pricingMode === "retail"
                ? "bg-[#c2185b] text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Store size={13} />
            Retail
          </button>
          <button
            type="button"
            onClick={() => isApproved && setPricingMode("wholesale")}
            disabled={!isApproved}
            title={
              isApproved
                ? undefined
                : "Apply for a wholesale account to unlock member pricing"
            }
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
              pricingMode === "wholesale"
                ? "bg-[#2d6a2d] text-white shadow"
                : "text-gray-700 hover:bg-gray-100",
              !isApproved && "cursor-not-allowed opacity-60"
            )}
          >
            <ShieldCheck size={13} />
            Wholesale
          </button>
        </div>
      </div>
      {!isApproved && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-700 sm:px-5">
          Want member pricing?{" "}
          <a
            href="/wholesale"
            className="font-semibold text-[#c2185b] underline underline-offset-2 hover:text-[#9c0e4a]"
          >
            Apply for a wholesale account
          </a>
          .
        </div>
      )}
    </div>
  );
}
