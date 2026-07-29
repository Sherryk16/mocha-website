"use client";

import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { IconCheck, IconLock } from "@/components/ui/icons";

export function PricingModeBanner() {
  const { pricingMode, setPricingMode } = useCart();
  const { user } = useAuth();
  const isApproved = user?.role === "wholesale" && user.approved;

  return (
    <div className="bg-black/30 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <p className="text-gray-200">
          Showing{" "}
          <span className="font-semibold text-white">
            {pricingMode === "wholesale" ? "wholesale" : "retail"}
          </span>{" "}
          pricing. Switch below to compare.
        </p>
        <div className="inline-flex items-center rounded-full bg-white/20 p-1 ring-1 ring-white/30">
          <button
            type="button"
            onClick={() => setPricingMode("retail")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition",
              pricingMode === "retail"
                ? "bg-white text-coffee-900"
                : "text-white hover:bg-white/20"
            )}
          >
            {pricingMode === "retail" && <IconCheck className="h-3 w-3" />}
            Retail
          </button>
          <button
            type="button"
            onClick={() => (isApproved ? setPricingMode("wholesale") : null)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition",
              pricingMode === "wholesale"
                ? "bg-accent text-coffee-900"
                : "text-white hover:bg-white/20",
              !isApproved && "cursor-not-allowed opacity-70"
            )}
            title={
              isApproved
                ? "Toggle wholesale pricing"
                : "Apply and get approved for a wholesale account"
            }
          >
            {pricingMode === "wholesale" && <IconCheck className="h-3 w-3" />}
            Wholesale
            {!isApproved && <IconLock className="h-3 w-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
