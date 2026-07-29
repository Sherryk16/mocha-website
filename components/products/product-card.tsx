"use client";

import Image from "next/image";
import Link from "next/link";

import { IconArrowRight } from "@/components/ui/icons";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/products";
import type { CatalogItem } from "@/lib/catalog";

type CardItem =
  | { kind: "product"; product: Product }
  | { kind: "catalog"; item: CatalogItem };

export function ProductCard(props: CardItem) {
  const { pricingMode } = useCart();
  const isProduct = props.kind === "product";

  const slug = isProduct ? props.product.slug : props.item.slug;
  const name = isProduct ? props.product.name : props.item.name;
  const image = isProduct ? props.product.image : props.item.image;
  const brand = isProduct
    ? props.product.brand.replace(/-/g, " ")
    : "Mocha Wholesale";

  const variant = isProduct
    ? props.product.variants[0]
    : {
        id: `${props.item.slug}-default`,
        label: props.item.size,
        size: props.item.size,
        retailPrice: props.item.retailPrice,
        wholesalePrice: props.item.wholesalePrice,
      };

  const price =
    pricingMode === "wholesale"
      ? variant.wholesalePrice
      : variant.retailPrice;

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
        />
        {pricingMode === "wholesale" && (
          <span className="absolute right-2 top-2 rounded bg-[#2d6a2d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Wholesale
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-[#c2185b]">
          {name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(price)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              {variant.size}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#c2185b] px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-[#9c0e4a]">
            View
            <IconArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
