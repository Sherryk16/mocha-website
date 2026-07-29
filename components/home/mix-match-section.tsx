import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { type CatalogGroup } from "@/lib/catalog";

const categories: {
  name: string;
  group: CatalogGroup;
  image: string;
}[] = [
  { name: "Premium Coffee", group: "coffee", image: "/premium-coffee/Roasted.png" },
  { name: "Premium Syrups", group: "syrups", image: "/premium-syrups/Vanilla-Flavored-Syrup.png" },
  { name: "Premium Sauces", group: "sauces", image: "/premium-sauces/Premium-Chocolate-Sauce-1.png" },
  { name: "Spreads", group: "spreads", image: "/spreads/Biscoff-Spread.png" },
  { name: "Tea & Spices", group: "tea-and-spices", image: "/tea-spices/spices-hero4.png" },
  { name: "Mixes", group: "mixes", image: "/mixes/turkish-mix.png" },
  { name: "Premium Ingredients", group: "ingredients", image: "/premium-ingredients/strawberry-slice.png" },
];

export function MixMatchSection() {
  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          <span className="text-coffee-700">Mix. Match.</span>{" "}
          <span className="text-gray-900">Amaze.</span>
        </h2>

        <p className="mt-4 text-gray-800 text-base sm:text-lg max-w-xl">
          With no requirement to buy by the case, you can mix and match
          syrups, sauces, spreads, spices and more from our full catalog.
        </p>

        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-2 text-gray-900 font-medium hover:text-coffee-700 transition-colors"
        >
          Shop All Categories
          <ArrowRight className="w-4 h-4 text-coffee-700" />
        </Link>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {categories.map((cat) => (
            <Link
              key={cat.group}
              href={`/products?group=${cat.group}`}
              className="group block"
            >
              <div className="relative w-full h-48 sm:h-56 rounded-2xl bg-coffee-100/60 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain object-bottom p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-gray-900 font-medium group-hover:text-coffee-700 transition-colors">
                {cat.name}
                <ArrowRight className="w-4 h-4 text-coffee-700" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
