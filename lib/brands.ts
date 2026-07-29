export type BrandSlug = "white-rhino" | "barista-underground" | "coffee-bean-corral";

export type Brand = {
  slug: BrandSlug;
  name: string;
  tagline: string;
  description: string;
  origin: string;
  hero: string;
  accent: string;
};

export const BRANDS: Brand[] = [
  {
    slug: "white-rhino",
    name: "White Rhino Coffee",
    tagline: "Bold. Smooth. Unforgettable.",
    description:
      "Family-roasted single-origin and signature blends crafted at our Dearborn facility. White Rhino is built on the belief that every café deserves coffee that holds its character from the first pour to the last drop of the day.",
    origin: "Dearborn, Michigan",
    hero:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=80",
    accent: "#c9a368",
  },
  {
    slug: "barista-underground",
    name: "Barista Underground",
    tagline: "Crafted for the working barista.",
    description:
      "A working barista's label. Espresso profiles and signature drinks formulated with high-volume cafés in mind — built to perform on calibrated machines and to stand up to the rush.",
    origin: "Detroit, Michigan",
    hero:
      "https://images.unsplash.com/photo-1442512592681-2636dabe9b2c?auto=format&fit=crop&w=1600&q=80",
    accent: "#8e6a3f",
  },
  {
    slug: "coffee-bean-corral",
    name: "Coffee Bean Corral",
    tagline: "Honest beans. No shortcuts.",
    description:
      "Direct-trade green coffee, drum-roasted in small batches. The Corral sources from single-estate farms and brings the harvest to your hopper with full traceability from cherry to cup.",
    origin: "Dearborn, Michigan",
    hero:
      "https://images.unsplash.com/photo-1559525839-d9acfd03c4eb?auto=format&fit=crop&w=1600&q=80",
    accent: "#6b4f2d",
  },
];

export const BRANDS_BY_SLUG: Record<BrandSlug, Brand> = BRANDS.reduce(
  (acc, b) => {
    acc[b.slug] = b;
    return acc;
  },
  {} as Record<BrandSlug, Brand>
);
