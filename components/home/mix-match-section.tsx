import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { type CatalogGroup } from "@/lib/catalog";

const categories: {
  name: string;
  group: CatalogGroup;
  image: string;
  blurb: string;
}[] = [
  {
    name: "Premium Coffee",
    group: "coffee",
    image: "/premium-coffee/Roasted.png",
    blurb: "Roasts & blends",
  },
  {
    name: "Premium Syrups",
    group: "syrups",
    image: "/premium-syrups/Vanilla-Flavored-Syrup.png",
    blurb: "Flavored syrups",
  },
  {
    name: "Premium Sauces",
    group: "sauces",
    image: "/premium-sauces/Premium-Chocolate-Sauce-1.png",
    blurb: "Latte & frappe sauces",
  },
  {
    name: "Spreads",
    group: "spreads",
    image: "/spreads/Biscoff-Spread.png",
    blurb: "Biscoff & kadaifi",
  },
  {
    name: "Tea & Spices",
    group: "tea-and-spices",
    image: "/tea-spices/spices-hero4.png",
    blurb: "Matcha & chai spices",
  },
  {
    name: "Mixes",
    group: "mixes",
    image: "/mixes/turkish-mix.png",
    blurb: "Turkish & Arabic blends",
  },
  {
    name: "Premium Ingredients",
    group: "ingredients",
    image: "/premium-ingredients/strawberry-slice.png",
    blurb: "Freeze-dried fruits",
  },
];

export function MixMatchSection() {
  return (
    <section className="w-full bg-white py-10 px-4 sm:py-16 sm:px-6 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            <span className="text-coffee-700">Shop</span>{" "}
            <span className="text-gray-900">by Category</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-gray-800 text-sm sm:text-lg max-w-xl mx-auto">
            With no requirement to buy by the case, mix and match syrups,
            sauces, spreads, spices and more from our full catalog.
          </p>

          <Link
            href="/products"
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-gray-900 font-medium hover:text-coffee-700 transition-colors text-sm sm:text-base"
          >
            Shop All Categories
            <ArrowRight className="w-4 h-4 text-coffee-700" />
          </Link>
        </div>

        <div className="mt-10 sm:mt-16 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
          {categories.map((cat) => (
            <Link
              key={cat.group}
              href={`/products?group=${cat.group}`}
              className="group block text-center"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden transition-transform duration-300 group-hover:scale-[1.06] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[360px]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-contain"
                />
              </div>

              <p className="mt-3 text-[11px] font-bold uppercase leading-snug tracking-wider text-gray-900 group-hover:text-coffee-700 sm:mt-4 sm:text-base">
                {cat.name}
              </p>
              <p className="hidden text-sm text-gray-500 sm:block">
                {cat.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
