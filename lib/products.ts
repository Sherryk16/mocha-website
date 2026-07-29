import type { BrandSlug } from "./brands";

export type Category =
  | "premium-coffee"
  | "espresso-blends"
  | "green-coffee"
  | "premium-sauces"
  | "spreads-and-fillings"
  | "premium-syrups"
  | "tea-and-spices"
  | "matcha";

export const CATEGORIES: { slug: Category; label: string; description: string }[] = [
  {
    slug: "premium-coffee",
    label: "Premium Coffee",
    description: "Whole bean and ground coffee built for cafés and offices.",
  },
  {
    slug: "espresso-blends",
    label: "Espresso Blends",
    description: "Calibrated espresso profiles for high-volume service.",
  },
  {
    slug: "green-coffee",
    label: "Green Coffee",
    description: "Direct-trade unroasted beans from single-estate farms.",
  },
  {
    slug: "premium-sauces",
    label: "Premium Sauces",
    description: "Chocolate, caramel, pistachio and signature dessert sauces.",
  },
  {
    slug: "spreads-and-fillings",
    label: "Spreads & Fillings",
    description: "Biscoff, pistachio and signature spreads for pastries.",
  },
  {
    slug: "premium-syrups",
    label: "Premium Syrups",
    description: "Flavored syrups designed for coffee and cocktail bars.",
  },
  {
    slug: "tea-and-spices",
    label: "Tea & Spices",
    description: "Loose leaf teas, matcha and powdered spices.",
  },
  {
    slug: "matcha",
    label: "Ceremonial Matcha",
    description: "Single-origin ceremonial-grade matcha for cafés.",
  },
];

export type Variant = {
  id: string;
  label: string;
  size: string;
  retailPrice: number;
  wholesalePrice: number;
  inStock: number;
};

export type Product = {
  slug: string;
  name: string;
  brand: BrandSlug;
  category: Category;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  origin?: string;
  roastLevel?: "Light" | "Medium" | "Medium-Dark" | "Dark";
  tastingNotes?: string[];
  ingredients?: string;
  variants: Variant[];
  featured?: boolean;
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const PRODUCTS: Product[] = [
  // ---------- White Rhino Coffee ----------
  {
    slug: "white-rhino-blend-roast",
    name: "Signature Blend Roast",
    brand: "white-rhino",
    category: "premium-coffee",
    shortDescription:
      "Our flagship blend — a balanced cup with cocoa, almond and a clean citrus finish.",
    description:
      "White Rhino's Signature Blend Roast is built from three single-origin lots, blended weekly at our Dearborn facility. The result is a versatile, crowd-pleasing cup that holds its character across espresso, batch brew and pour-over.",
    image: u("photo-1559525839-d9acfd03c4eb"),
    gallery: [
      u("photo-1559525839-d9acfd03c4eb"),
      u("photo-1442550528053-c431ecb55509"),
      u("photo-1497935586351-b67a49e012bf"),
    ],
    origin: "Brazil · Colombia · Ethiopia",
    roastLevel: "Medium",
    tastingNotes: ["Cocoa", "Toasted Almond", "Orange Peel"],
    ingredients: "100% Arabica coffee beans.",
    variants: [
      {
        id: "wr-blend-5lb",
        label: "5 lb Bag",
        size: "5 lb / 2.27 kg",
        retailPrice: 85.0,
        wholesalePrice: 58.0,
        inStock: 240,
      },
      {
        id: "wr-blend-25lb",
        label: "25 lb Case",
        size: "25 lb / 11.34 kg",
        retailPrice: 360.0,
        wholesalePrice: 245.0,
        inStock: 60,
      },
    ],
    featured: true,
  },
  {
    slug: "white-rhino-dark-roast",
    name: "Dark Roast Espresso",
    brand: "white-rhino",
    category: "espresso-blends",
    shortDescription:
      "Heavy-bodied dark roast calibrated for milk drinks and classic Americanos.",
    description:
      "A deep, syrupy espresso blend that punches through 12oz milk drinks without losing definition. Roasted dark enough to deliver that nostalgic diner-coffee note without going ashy.",
    image: u("photo-1511920170038-fceb6f7b1a8c"),
    origin: "Sumatra · Brazil",
    roastLevel: "Dark",
    tastingNotes: ["Dark Chocolate", "Molasses", "Walnut"],
    ingredients: "100% Arabica coffee beans.",
    variants: [
      {
        id: "wr-dark-5lb",
        label: "5 lb Bag",
        size: "5 lb / 2.27 kg",
        retailPrice: 88.0,
        wholesalePrice: 60.0,
        inStock: 180,
      },
    ],
    featured: true,
  },

  // ---------- Barista Underground ----------
  {
    slug: "barista-underground-house-espresso",
    name: "House Espresso Blend",
    brand: "barista-underground",
    category: "espresso-blends",
    shortDescription:
      "A working barista's blend — built for consistency on a busy bar.",
    description:
      "House Espresso was developed over six months with our partner cafés across metro Detroit. The roast profile is calibrated to extract beautifully on calibrated La Marzoccos and to hold up to milk at high volume.",
    image: u("photo-1495474472287-4d71bcdd2085"),
    gallery: [
      u("photo-1495474472287-4d71bcdd2085"),
      u("photo-1442512592681-2636dabe9b2c"),
    ],
    origin: "Guatemala · Ethiopia",
    roastLevel: "Medium-Dark",
    tastingNotes: ["Brown Sugar", "Stone Fruit", "Cocoa Nib"],
    ingredients: "100% Arabica coffee beans.",
    variants: [
      {
        id: "bu-house-5lb",
        label: "5 lb Bag",
        size: "5 lb / 2.27 kg",
        retailPrice: 90.0,
        wholesalePrice: 62.0,
        inStock: 200,
      },
      {
        id: "bu-house-25lb",
        label: "25 lb Case",
        size: "25 lb / 11.34 kg",
        retailPrice: 395.0,
        wholesalePrice: 268.0,
        inStock: 70,
      },
    ],
    featured: true,
  },
  {
    slug: "barista-underground-light-roast",
    name: "Light Roast Single Origin",
    brand: "barista-underground",
    category: "premium-coffee",
    shortDescription:
      "Bright, floral Ethiopian Yirgacheffe developed for filter service.",
    description:
      "A delicate light roast that highlights jasmine, bergamot and stone fruit. Best suited for V60, Chemex and batch brew on a careful recipe.",
    image: u("photo-1442550528053-c431ecb55509"),
    origin: "Ethiopia · Yirgacheffe",
    roastLevel: "Light",
    tastingNotes: ["Jasmine", "Bergamot", "White Peach"],
    ingredients: "100% Arabica coffee beans.",
    variants: [
      {
        id: "bu-light-5lb",
        label: "5 lb Bag",
        size: "5 lb / 2.27 kg",
        retailPrice: 95.0,
        wholesalePrice: 68.0,
        inStock: 120,
      },
    ],
  },

  // ---------- Coffee Bean Corral ----------
  {
    slug: "coffee-bean-corral-green-yirgacheffe",
    name: "Green Coffee — Yirgacheffe",
    brand: "coffee-bean-corral",
    category: "green-coffee",
    shortDescription:
      "Direct-trade Ethiopian Yirgacheffe green beans, single-estate, fully traceable.",
    description:
      "Sourced from a single washing station in the Gedeo Zone. Screen size 14-16, moisture content measured and reported on every lot. Ideal for roasters looking to build a stand-alone Ethiopian single origin.",
    image: u("photo-1497515114629-f71d768fd07c"),
    origin: "Ethiopia · Yirgacheffe",
    tastingNotes: ["Floral", "Citrus", "Honey"],
    ingredients: "100% unroasted Arabica green coffee.",
    variants: [
      {
        id: "cbc-yirga-25kg",
        label: "25 kg Bag",
        size: "25 kg / 55 lb",
        retailPrice: 480.0,
        wholesalePrice: 360.0,
        inStock: 35,
      },
      {
        id: "cbc-yirga-5kg",
        label: "5 kg Sample",
        size: "5 kg / 11 lb",
        retailPrice: 130.0,
        wholesalePrice: 95.0,
        inStock: 90,
      },
    ],
    featured: true,
  },
  {
    slug: "coffee-bean-corral-green-colombia",
    name: "Green Coffee — Colombia Huila",
    brand: "coffee-bean-corral",
    category: "green-coffee",
    shortDescription:
      "Colombian Huila green beans, washed process, single producer.",
    description:
      "From a single producer in Pitalito, Huila. Washed process, sun-dried on raised beds. A versatile base for blends or a stand-alone medium roast.",
    image: u("photo-1442550528053-c431ecb55509"),
    origin: "Colombia · Huila",
    tastingNotes: ["Red Apple", "Caramel", "Brown Sugar"],
    ingredients: "100% unroasted Arabica green coffee.",
    variants: [
      {
        id: "cbc-huila-25kg",
        label: "25 kg Bag",
        size: "25 kg / 55 lb",
        retailPrice: 425.0,
        wholesalePrice: 320.0,
        inStock: 40,
      },
    ],
  },

  // ---------- Premium Sauces ----------
  {
    slug: "premium-chocolate-sauce-2-5kg",
    name: "Premium Chocolate Sauce 2.5kg",
    brand: "white-rhino",
    category: "premium-sauces",
    shortDescription:
      "Rich, glossy chocolate sauce formulated for high-volume beverage service.",
    description:
      "A workhorse chocolate sauce built for cafés and bakeries. Holds its viscosity across hot and cold applications and pumps smoothly through standard sauce bottles.",
    image: u("photo-1606312619070-d48b4c652a52"),
    origin: "Made in Michigan",
    ingredients:
      "Sugar, cocoa, glucose syrup, vegetable oil, milk solids, salt, soy lecithin, vanillin.",
    variants: [
      {
        id: "choc-2-5kg",
        label: "2.5 kg Jug",
        size: "2.5 kg / 5.5 lb",
        retailPrice: 32.0,
        wholesalePrice: 22.0,
        inStock: 320,
      },
      {
        id: "choc-12kg",
        label: "12 kg Case (4 × 3 kg)",
        size: "12 kg / 26.5 lb",
        retailPrice: 130.0,
        wholesalePrice: 92.0,
        inStock: 80,
      },
    ],
    featured: true,
  },
  {
    slug: "pistachio-verde-sauce",
    name: "Pistachio Verde Sauce 2.5kg",
    brand: "barista-underground",
    category: "premium-sauces",
    shortDescription:
      "Premium pistachio sauce with real pistachio content. Built for the modern dessert menu.",
    description:
      "Pistachio Verde Sauce is a thick, vibrant sauce made with real pistachios. Designed for use in lattes, frappes, gelato and bakery applications.",
    image: u("photo-1571091718767-18b5b1457add"),
    origin: "Made in Michigan",
    ingredients:
      "Sugar, pistachio (24%), vegetable oil, milk solids, salt, soy lecithin, vanillin, color (E141, E100).",
    variants: [
      {
        id: "pist-2-5kg",
        label: "2.5 kg Jug",
        size: "2.5 kg / 5.5 lb",
        retailPrice: 36.0,
        wholesalePrice: 26.0,
        inStock: 220,
      },
    ],
    featured: true,
  },

  // ---------- Spreads & Fillings ----------
  {
    slug: "biscoff-spread-topping",
    name: "Biscoff Spread Topping 3kg",
    brand: "coffee-bean-corral",
    category: "spreads-and-fillings",
    shortDescription:
      "Authentic Biscoff spread for pastries, lattes and dessert builds.",
    description:
      "A creamy caramelized-biscuit spread ready to pipe, scoop or blend. Used by cafés and bakeries across the region for signature Biscoff drinks and fillings.",
    image: u("photo-1488477181946-6428a0291777"),
    origin: "Made in Belgium · Imported",
    ingredients: "Wheat flour, sugar, vegetable oil, soy lecithin, cinnamon.",
    variants: [
      {
        id: "bisc-3kg",
        label: "3 kg Tub",
        size: "3 kg / 6.6 lb",
        retailPrice: 38.0,
        wholesalePrice: 28.0,
        inStock: 150,
      },
    ],
    featured: true,
  },

  // ---------- Premium Syrups ----------
  {
    slug: "hazelnut-flavored-syrup",
    name: "Hazelnut Flavored Syrup",
    brand: "white-rhino",
    category: "premium-syrups",
    shortDescription:
      "Classic hazelnut syrup — a high-volume staple for any café.",
    description:
      "Our most-ordered flavor. Clean hazelnut profile, dissolves cleanly in hot and cold applications.",
    image: u("photo-1572490122747-3968b75ac699"),
    origin: "Made in Michigan",
    ingredients: "Sugar, water, natural and artificial flavor, citric acid, sodium benzoate.",
    variants: [
      {
        id: "hzl-750ml",
        label: "750 ml Bottle",
        size: "750 ml / 25.4 fl oz",
        retailPrice: 12.0,
        wholesalePrice: 8.0,
        inStock: 480,
      },
      {
        id: "hzl-2-5l",
        label: "2.5 L Bottle",
        size: "2.5 L / 84.5 fl oz",
        retailPrice: 32.0,
        wholesalePrice: 22.0,
        inStock: 180,
      },
    ],
  },
  {
    slug: "vanilla-flavored-syrup",
    name: "Vanilla Flavored Syrup",
    brand: "white-rhino",
    category: "premium-syrups",
    shortDescription:
      "Versatile vanilla syrup designed for espresso-based drinks.",
    description:
      "Clean, balanced vanilla. Pairs with espresso, milk, and dessert builds without overpowering.",
    image: u("photo-1556679343-c7306c1976bc"),
    origin: "Made in Michigan",
    ingredients: "Sugar, water, natural and artificial flavor, citric acid, sodium benzoate.",
    variants: [
      {
        id: "van-750ml",
        label: "750 ml Bottle",
        size: "750 ml / 25.4 fl oz",
        retailPrice: 12.0,
        wholesalePrice: 8.0,
        inStock: 540,
      },
    ],
  },

  // ---------- Tea & Spices ----------
  {
    slug: "ceremonial-grade-matcha",
    name: "Ceremonial Grade A Matcha",
    brand: "barista-underground",
    category: "matcha",
    shortDescription:
      "Single-origin ceremonial-grade matcha from Uji, Japan.",
    description:
      "Stone-milled, vibrant green, naturally sweet. Suitable for traditional preparation and modern café matcha lattes.",
    image: u("photo-1545665277-5937489579f2"),
    origin: "Uji, Japan",
    tastingNotes: ["Umami", "Sweet Grass", "Seaweed"],
    ingredients: "100% stone-milled green tea powder.",
    variants: [
      {
        id: "matcha-100g",
        label: "100 g Tin",
        size: "100 g / 3.5 oz",
        retailPrice: 105.0,
        wholesalePrice: 78.0,
        inStock: 60,
      },
      {
        id: "matcha-1kg",
        label: "1 kg Case",
        size: "1 kg / 35.3 oz",
        retailPrice: 880.0,
        wholesalePrice: 650.0,
        inStock: 18,
      },
    ],
    featured: true,
  },
  {
    slug: "cardamom-ground",
    name: "Cardamom — Ground",
    brand: "coffee-bean-corral",
    category: "tea-and-spices",
    shortDescription:
      "Finely ground green cardamom pods sourced from the Indian subcontinent.",
    description:
      "Used in Arabic coffee, chai blends and dessert builds. Available in bulk for cafés, bakeries and restaurants.",
    image: u("photo-1599909533088-c25f76c69c74"),
    origin: "India · Guatemala",
    ingredients: "100% ground green cardamom.",
    variants: [
      {
        id: "card-1lb",
        label: "1 lb Bag",
        size: "1 lb / 454 g",
        retailPrice: 24.0,
        wholesalePrice: 16.0,
        inStock: 140,
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: string) {
  return PRODUCTS.filter((p) => p.brand === brand);
}

export function getProductsByCategory(category: string) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  ).slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tastingNotes ?? []).some((t) => t.toLowerCase().includes(q))
  );
}
