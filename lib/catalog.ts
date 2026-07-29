export type CatalogGroup =
  | "coffee"
  | "syrups"
  | "sauces"
  | "spreads"
  | "tea-and-spices"
  | "mixes"
  | "ingredients";

export type CatalogItem = {
  slug: string;
  name: string;
  group: CatalogGroup;
  image: string;
  size: string;
  shortDescription: string;
  description: string;
  tastingNotes?: string[];
  origin?: string;
  wholesalePrice: number;
  retailPrice: number;
  inStock: number;
};

function item(args: {
  group: CatalogGroup;
  name: string;
  image: string;
  size: string;
  shortDescription: string;
  description: string;
  tastingNotes?: string[];
  origin?: string;
  wholesalePrice: number;
  inStock?: number;
}): CatalogItem {
  return {
    group: args.group,
    slug: args.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    name: args.name,
    image: args.image,
    size: args.size,
    shortDescription: args.shortDescription,
    description: args.description,
    tastingNotes: args.tastingNotes,
    origin: args.origin,
    wholesalePrice: args.wholesalePrice,
    retailPrice: Math.round(args.wholesalePrice * 1.4 * 100) / 100,
    inStock: args.inStock ?? 120,
  };
}

export const CATALOG_ITEMS: CatalogItem[] = [
  item({
    group: "coffee",
    name: "Blend Roast",
    image: "/premium-coffee/Blend-Roast.png",
    size: "5 lb Bag",
    shortDescription:
      "Our flagship blend — balanced cup with cocoa, almond and a clean citrus finish.",
    description:
      "Built from three single-origin lots and blended fresh every week. Versatile enough for espresso, batch brew and pour-over service.",
    tastingNotes: ["Cocoa", "Toasted Almond", "Orange Peel"],
    origin: "Brazil · Colombia · Ethiopia",
    wholesalePrice: 85,
  }),
  item({
    group: "coffee",
    name: "Light Roast",
    image: "/premium-coffee/light-roast-1.png",
    size: "5 lb Bag",
    shortDescription:
      "Bright and floral — developed for filter service and slow brew methods.",
    description:
      "A delicate light roast that highlights jasmine, bergamot and stone fruit. Best for V60, Chemex, batch brew on a careful recipe.",
    tastingNotes: ["Jasmine", "Bergamot", "White Peach"],
    origin: "Ethiopia · Yirgacheffe",
    wholesalePrice: 97.75,
  }),
  item({
    group: "coffee",
    name: "Medium Roast",
    image: "/premium-coffee/medium-roast-1.png",
    size: "5 lb Bag",
    shortDescription: "Balanced medium roast with a clean finish.",
    description:
      "Smooth, well-rounded cup with caramel sweetness and mild acidity. Pairs with espresso-based drinks and manual brews alike.",
    tastingNotes: ["Caramel", "Citrus", "Almond"],
    origin: "Colombia · Guatemala",
    wholesalePrice: 85,
  }),
  item({
    group: "coffee",
    name: "Dark Roast",
    image: "/premium-coffee/dark-roast-1.png",
    size: "5 lb Bag",
    shortDescription:
      "Heavy-bodied dark roast calibrated for milk drinks and classic Americanos.",
    description:
      "A deep, syrupy espresso blend that punches through 12oz milk drinks without losing definition.",
    tastingNotes: ["Dark Chocolate", "Molasses", "Walnut"],
    origin: "Sumatra · Brazil",
    wholesalePrice: 89.25,
  }),
  item({
    group: "syrups",
    name: "Vanilla Flavored Syrup",
    image: "/premium-syrups/Vanilla-Flavored-Syrup.png",
    size: "750 ml Bottle",
    shortDescription:
      "Clean vanilla syrup designed for espresso-based drinks.",
    description:
      "Versatile vanilla syrup with a balanced sweetness. Pairs with espresso, milk, and dessert builds without overpowering the base.",
    origin: "Made in Michigan",
    wholesalePrice: 12,
  }),
  item({
    group: "syrups",
    name: "Hazelnut Flavored Syrup",
    image: "/premium-syrups/Hazelnut-Flavored.png",
    size: "750 ml Bottle",
    shortDescription:
      "Classic hazelnut syrup — a high-volume staple for any café.",
    description:
      "Our most-ordered flavor. Clean hazelnut profile that dissolves cleanly in hot and cold applications.",
    origin: "Made in Michigan",
    wholesalePrice: 12,
  }),
  item({
    group: "syrups",
    name: "Premium Strawberry Syrup",
    image: "/premium-syrups/Premium-Strawberry-Syrup-2.png",
    size: "750 ml Bottle",
    shortDescription:
      "Bright strawberry syrup for lattes, lemonades and signature drinks.",
    description:
      "Sun-ripped strawberry notes balanced with cane sugar. Holds its color in cold applications and mixes cleanly into espresso.",
    origin: "Made in Michigan",
    wholesalePrice: 13.8,
  }),
  item({
    group: "syrups",
    name: "Premium Pomegranate Syrup",
    image: "/premium-syrups/premium-pomegranate-syrup.png",
    size: "750 ml Bottle",
    shortDescription:
      "Tart-sweet pomegranate syrup — a modern favorite for spritzers and sodas.",
    description:
      "Layered pomegranate flavor with a clean cane-sugar finish. Excellent for cocktail bar service and seasonal menus.",
    origin: "Made in Michigan",
    wholesalePrice: 14.4,
  }),
  item({
    group: "syrups",
    name: "Cranberry Syrup",
    image: "/premium-syrups/cranberry-syrup.png",
    size: "750 ml Bottle",
    shortDescription:
      "Tart cranberry syrup with a refined sweetness — perfect for holiday menus.",
    description:
      "A balanced cranberry syrup that adds brightness to cocktails, mocktails, lemonades and espresso drinks.",
    origin: "Made in Michigan",
    wholesalePrice: 13.2,
  }),
  item({
    group: "sauces",
    name: "Premium White Chocolate Sauce",
    image: "/premium-sauces/Premium-White-Chocolate-Sauce-1.png",
    size: "2.5 kg Jug",
    shortDescription:
      "Rich, creamy white chocolate sauce for desserts and beverages.",
    description:
      "A premium white chocolate sauce with a satin-smooth pour. Built for hot and cold applications across beverage and dessert menus.",
    origin: "Made in Michigan",
    wholesalePrice: 35.2,
  }),
  item({
    group: "sauces",
    name: "Premium Taro Sauce",
    image: "/premium-sauces/premium-taro-sauce.png",
    size: "2.5 kg Jug",
    shortDescription:
      "Plant-based taro sauce — a purple signature for modern beverage menus.",
    description:
      "Smooth, naturally pigmented taro sauce with a delicate, nutty sweetness. Built for oat-milk pairings and Asian-inspired dessert drinks.",
    origin: "Made in Michigan",
    wholesalePrice: 40,
  }),
  item({
    group: "sauces",
    name: "Premium Salted Caramel Sauce",
    image: "/premium-sauces/Premium-Salted-Caramel-Sauce.png",
    size: "2.5 kg Jug",
    shortDescription:
      "Salted caramel sauce — the high-volume bar favorite.",
    description:
      "Deep caramel notes balanced with fine sea salt. Pumps cleanly through standard sauce bottles and holds across hot and cold builds.",
    origin: "Made in Michigan",
    wholesalePrice: 36.8,
  }),
  item({
    group: "sauces",
    name: "Premium Pistachio Sauce",
    image: "/premium-sauces/premium-pistachio-sauce.png",
    size: "2.5 kg Jug",
    shortDescription:
      "Premium pistachio sauce with real pistachio content.",
    description:
      "Pistachio Verde Sauce is thick, vibrant and designed for lattes, frappes, gelato and bakery applications.",
    tastingNotes: ["Roasted Pistachio", "Vanilla", "Sea Salt"],
    origin: "Made in Michigan",
    wholesalePrice: 41.6,
  }),
  item({
    group: "sauces",
    name: "Premium Chocolate Sauce",
    image: "/premium-sauces/Premium-Chocolate-Sauce-1.png",
    size: "2.5 kg Jug",
    shortDescription:
      "Rich, glossy chocolate sauce formulated for high-volume service.",
    description:
      "A workhorse chocolate sauce built for cafés and bakeries. Holds its viscosity across hot and cold applications.",
    origin: "Made in Michigan",
    wholesalePrice: 33.6,
  }),
  item({
    group: "sauces",
    name: "Premium Caramel Toffee Sauce",
    image: "/premium-sauces/Premium-Caramel-Toffee-Sauce-1.png",
    size: "2.5 kg Jug",
    shortDescription:
      "Buttery caramel-toffee sauce — a dessert bar essential.",
    description:
      "Slow-cooked caramel-toffee sauce with a sticky-sweet richness and easy pour. Perfect for sundaes, pancakes, and dessert toppings.",
    origin: "Made in Michigan",
    wholesalePrice: 36.8,
  }),
  item({
    group: "spreads",
    name: "Biscoff Spread",
    image: "/spreads/Biscoff-Spread.png",
    size: "3 kg Tub",
    shortDescription: "Authentic Biscoff spread for pastries and dessert builds.",
    description:
      "A creamy caramelized-biscuit spread ready to pipe, scoop or blend. Used by cafés and bakeries for signature Biscoff drinks and fillings.",
    origin: "Made in Belgium · Imported",
    wholesalePrice: 38,
  }),
  item({
    group: "spreads",
    name: "Caramelized Biscuit 6kg",
    image: "/spreads/caramelized biscuit 6kg.png",
    size: "6 kg Tub",
    shortDescription: "Caramelized biscuit spread — bulk format for cafés.",
    description:
      "A 6kg tub of caramelized-biscuit spread for bakeries and cafés scaling up dessert programs.",
    origin: "Made in Belgium · Imported",
    wholesalePrice: 57,
  }),
  item({
    group: "spreads",
    name: "Dubai Kadaifi Sauce 1400g",
    image: "/spreads/dubai kadaifi sauce 1400 gram.png",
    size: "1.4 kg Jug",
    shortDescription:
      "Dubai-style kadaifi sauce for the viral dessert build.",
    description:
      "A rich pistachio-kadaifi sauce formulated for the viral Dubai dessert build. Ready to pour over shredded phyllo and pistachio cream.",
    origin: "Made in Lebanon",
    wholesalePrice: 53.2,
  }),
  item({
    group: "tea-and-spices",
    name: "Cinnamon Powder",
    image: "/tea-spices/powder-cinnamon.jpg",
    size: "1 lb Bag",
    shortDescription:
      "Finely ground cinnamon — a versatile bar staple.",
    description:
      "Finely ground Ceylon cinnamon with a bright, slightly sweet profile. Perfect for chai, lattes, cappuccinos and bakery dusting.",
    origin: "Sri Lanka",
    wholesalePrice: 16.8,
  }),
  item({
    group: "tea-and-spices",
    name: "Ginger Powder",
    image: "/tea-spices/Ginger-Powder-Photoroom.png",
    size: "1 lb Bag",
    shortDescription:
      "Finely ground ginger — bright heat and warm finish.",
    description:
      "Finely ground ginger with bright heat and warm finish. Built for chai blends, spice rubs, and signature beverage menus.",
    origin: "India",
    wholesalePrice: 19.2,
  }),
  item({
    group: "tea-and-spices",
    name: "Cardamom Seeds",
    image: "/tea-spices/Cardamom-Seeds.png",
    size: "1 lb Bag",
    shortDescription:
      "Whole green cardamom pods — a signature note for Arabic coffee and chai.",
    description:
      "Whole green cardamom pods cultivated for Arabic coffee, chai, and dessert builds. Available in bulk for cafés, bakeries, and restaurants.",
    origin: "India · Guatemala",
    wholesalePrice: 26.4,
  }),
  item({
    group: "tea-and-spices",
    name: "Ceremonial Grade A Matcha",
    image: "/tea-spices/cerremonial grade a matcha.png",
    size: "1 lb Bag",
    shortDescription:
      "Single-origin ceremonial-grade matcha from Uji, Japan.",
    description:
      "Stone-milled, vibrant green, naturally sweet. Suitable for traditional preparation and modern café matcha lattes.",
    tastingNotes: ["Umami", "Sweet Grass", "Seaweed"],
    origin: "Uji, Japan",
    wholesalePrice: 108,
  }),
  item({
    group: "tea-and-spices",
    name: "Spices Blend",
    image: "/tea-spices/spices-hero4.png",
    size: "1 lb Bag",
    shortDescription:
      "Signature spices blend — a versatile staple for chai, coffee and dessert bars.",
    description:
      "A balanced, hand-blended spice mix geared toward modern café service. Use for chai, signature coffee drinks, and pastry programs.",
    origin: "Multi-origin",
    wholesalePrice: 26.4,
  }),
  item({
    group: "mixes",
    name: "Turkish Mix",
    image: "/mixes/turkish-mix.png",
    size: "1 kg Bag",
    shortDescription:
      "Authentic Turkish-style coffee mix — ready to grind and brew.",
    description:
      "A pre-blended Turkish-style coffee mix that supports thin, traditional brew methods. Calibrated for cezve, ibrik, and modern brew systems.",
    origin: "Multi-origin",
    wholesalePrice: 33,
  }),
  item({
    group: "mixes",
    name: "Mafawwar Mix",
    image: "/mixes/Mafawwar.png",
    size: "1 kg Bag",
    shortDescription:
      "Mafawwar house blend — a fragrant traditional Arab coffee mix.",
    description:
      "Our Mafawwar house blend, infused with cardamom and saffron notes. A signature mix used in Middle-Eastern cafés and dining concepts.",
    origin: "Multi-origin",
    wholesalePrice: 37.5,
  }),
  item({
    group: "mixes",
    name: "Jubani Mix",
    image: "/mixes/Jubani.png",
    size: "1 kg Bag",
    shortDescription:
      "Jubani signature blend — traditionally spiced Arabic coffee.",
    description:
      "Our Jubani signature blend uses a unique mix of warm spices designed for traditional Arabic coffee service and modern dessert pairings.",
    origin: "Multi-origin",
    wholesalePrice: 39,
  }),
  item({
    group: "ingredients",
    name: "Strawberry Slices",
    image: "/premium-ingredients/strawberry-slice.png",
    size: "1 kg Pack",
    shortDescription:
      "Freeze-dried strawberry slices — perfect for garnish and tea blends.",
    description:
      "Freeze-dried strawberry slices that hold color, flavor and crunch. Excellent for tea blends, dessert garnish, and signature beverage toppings.",
    origin: "USA",
    wholesalePrice: 25.2,
  }),
  item({
    group: "ingredients",
    name: "Peach Dices",
    image: "/premium-ingredients/peaches-dice.png",
    size: "1 kg Pack",
    shortDescription:
      "Cinnamon-spiced peach dices — an instant upgrade for teas and pastries.",
    description:
      "Pre-portioned peach dices ready for tea blends, baked goods, and signature drink garnish. Holds shape during baking and brewing.",
    origin: "USA",
    wholesalePrice: 23.4,
  }),
  item({
    group: "ingredients",
    name: "Mango Dices",
    image: "/premium-ingredients/mango-dice.png",
    size: "1 kg Pack",
    shortDescription: "Sweet mango dices — vibrant accent for desserts and cocktails.",
    description:
      "Sweet, vibrant mango dices that perform equally well in tea blends, dessert bars, and frozen cocktail service.",
    origin: "Mexico · India",
    wholesalePrice: 24.3,
  }),
  item({
    group: "ingredients",
    name: "Dragon Fruit",
    image: "/premium-ingredients/dragon-fruits.png",
    size: "1 kg Pack",
    shortDescription:
      "Freeze-dried dragon fruit — a vivid, tropical accent for modern menus.",
    description:
      "Freeze-dried dragon fruit pieces with a vivid pink color and subtle sweetness. A modern accent for teas, smoothie bowls, and dessert garnish.",
    origin: "Vietnam",
    wholesalePrice: 27,
    inStock: 60,
  }),
];

CATALOG_ITEMS.forEach((c) => {
  if (
    Number.isNaN(c.wholesalePrice) ||
    !Number.isFinite(c.wholesalePrice) ||
    c.wholesalePrice <= 0
  ) {
    c.wholesalePrice = 30;
    c.retailPrice = Math.round(30 * 1.4 * 100) / 100;
  }
});

export const CATALOG_BY_SLUG = new Map(CATALOG_ITEMS.map((c) => [c.slug, c]));

export function getCatalogItem(slug: string) {
  return CATALOG_BY_SLUG.get(slug);
}
