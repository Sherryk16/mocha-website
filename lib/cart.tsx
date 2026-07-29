"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import type { Variant } from "./products";

export type CartItem = {
  productSlug: string;
  productName: string;
  brand: string;
  image: string;
  variantId: string;
  variantLabel: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

export type PricingMode = "retail" | "wholesale";

type CartContextValue = {
  items: CartItem[];
  pricingMode: PricingMode;
  setPricingMode: (mode: PricingMode) => void;
  addItem: (args: {
    product: { slug: string; name: string; brand: string; image: string };
    variant: Variant;
    pricingMode: PricingMode;
    quantity?: number;
  }) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  count: number;
  subtotal: number;
};

const STORAGE_KEY = "mocha-wholesale-cart";
const PRICING_KEY = "mocha-wholesale-pricing-mode";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}
function readPricing(): PricingMode {
  if (typeof window === "undefined") return "retail";
  try {
    const v = window.localStorage.getItem(PRICING_KEY);
    return v === "wholesale" ? "wholesale" : "retail";
  } catch {
    return "retail";
  }
}

type Listener = () => void;

function createStore<T>(read: () => T, initial: T) {
  let value = read();
  const listeners = new Set<Listener>();
  const subscribe = (l: Listener) => {
    listeners.add(l);
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      listeners.delete(l);
      if (typeof window !== "undefined" && listeners.size === 0) {
        window.removeEventListener("storage", onStorage);
      }
    };
  };
  function onStorage() {
    value = read();
    listeners.forEach((l) => l());
  }
  const getSnapshot = () => value;
  const serverSnapshot = initial;
  const getServerSnapshot = () => serverSnapshot;
  function set(next: T) {
    value = next;
    listeners.forEach((l) => l());
  }
  return { subscribe, getSnapshot, getServerSnapshot, set };
}

const cartStore = createStore<CartItem[]>(readCart, []);
const pricingStore = createStore<PricingMode>(readPricing, "retail");

function writeCart(items: CartItem[]) {
  cartStore.set(items);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }
}
function writePricing(mode: PricingMode) {
  pricingStore.set(mode);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PRICING_KEY, mode);
    } catch {
      /* noop */
    }
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const pricingMode = useSyncExternalStore(
    pricingStore.subscribe,
    pricingStore.getSnapshot,
    pricingStore.getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const setPricingMode = useCallback((mode: PricingMode) => {
    writePricing(mode);
  }, []);

  const addItem: CartContextValue["addItem"] = useCallback(
    ({ product, variant, pricingMode: mode, quantity = 1 }) => {
      const unitPrice =
        mode === "wholesale" ? variant.wholesalePrice : variant.retailPrice;
      const existing = items.find((i) => i.variantId === variant.id);
      const next = existing
        ? items.map((i) =>
            i.variantId === variant.id
              ? { ...i, quantity: i.quantity + quantity, unitPrice }
              : i
          )
        : [
            ...items,
            {
              productSlug: product.slug,
              productName: product.name,
              brand: product.brand,
              image: product.image,
              variantId: variant.id,
              variantLabel: variant.label,
              size: variant.size,
              unitPrice,
              quantity,
            },
          ];
      writeCart(next);
      setIsOpen(true);
    },
    [items]
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      writeCart(
        items
          .map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0)
      );
    },
    [items]
  );

  const removeItem = useCallback(
    (variantId: string) => {
      writeCart(items.filter((i) => i.variantId !== variantId));
    },
    [items]
  );

  const clear = useCallback(() => writeCart([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
    return {
      items,
      pricingMode,
      setPricingMode,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      count,
      subtotal,
    };
  }, [
    items,
    pricingMode,
    setPricingMode,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
