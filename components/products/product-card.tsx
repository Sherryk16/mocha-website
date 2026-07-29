"use client";

import Image from "next/image";
import Link from "next/link";

import { IconArrowRight } from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { pricingMode } = useCart();
  const variant = product.variants[0];
  const price =
    pricingMode === "wholesale" ? variant.wholesalePrice : variant.retailPrice;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {pricingMode === "wholesale" && (
          <span className="absolute right-2 top-2 rounded bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Wholesale
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {product.brand.replace(/-/g, " ")}
        </p>
        <h3 className="mt-1 font-medium text-gray-900">
          {product.name}
        </h3>
        <div className="mt-auto pt-3">
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(price)}
          </p>
          {pricingMode === "wholesale" && (
            <p className="text-xs text-green-600">Wholesale price</p>
          )}
        </div>
      </div>
    </Link>
  );
}
