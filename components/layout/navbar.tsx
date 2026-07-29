"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Globe,
  X,
  Menu,
} from "lucide-react";

import { useCart } from "@/lib/cart";
import type { CatalogGroup } from "@/lib/catalog";

const navLinks = [
  { label: "Shop", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Contact Us", href: "/contact" },
];

const CATEGORY_LABELS: Record<CatalogGroup, string> = {
  coffee: "Premium Coffee",
  syrups: "Premium Syrups",
  sauces: "Premium Sauces",
  spreads: "Spreads",
  "tea-and-spices": "Tea & Spices",
  mixes: "Mixes",
  ingredients: "Premium Ingredients",
};

const CATEGORY_ORDER: CatalogGroup[] = [
  "coffee",
  "syrups",
  "sauces",
  "spreads",
  "tea-and-spices",
  "mixes",
  "ingredients",
];

export default function Navbar({
  onOpenSearch,
}: {
  onOpenSearch?: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false);
  const desktopCategoriesRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeDropdowns = () => {
      setDesktopCategoriesOpen(false);
      setMobileCategoriesOpen(false);
    };
    window.addEventListener("popstate", closeDropdowns);
    return () => window.removeEventListener("popstate", closeDropdowns);
  }, []);

  useEffect(() => {
    if (!desktopCategoriesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (
        desktopCategoriesRef.current &&
        !desktopCategoriesRef.current.contains(e.target as Node)
      ) {
        setDesktopCategoriesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopCategoriesOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [desktopCategoriesOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openDesktopCategories = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDesktopCategoriesOpen(true);
  };

  const scheduleCloseDesktopCategories = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setDesktopCategoriesOpen(false);
    }, 150);
  };

  const closeDesktopCategories = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDesktopCategoriesOpen(false);
  };

  const mainNavBg = isHome
    ? scrolled
      ? "bg-gradient-to-b from-black/85 via-black/60 to-transparent"
      : "bg-transparent"
    : "bg-coffee-700 border-b border-coffee-900 shadow-md";

  const showTopBar = isHome ? !scrolled : true;

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* ── Top Bar (Green) ── */}
      {showTopBar && (
        <div className="hidden sm:block bg-coffee-700 text-white text-sm py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <a
              href="tel:3132080888"
              className="flex items-center gap-2 hover:text-coffee-300 transition-colors"
            >
              <Phone size={14} />
              <span>Phone: 313-208-0888</span>
            </a>

            <a
              href="mailto:sale@mochawholesale.com"
              className="flex items-center gap-2 hover:text-coffee-300 transition-colors"
            >
              <Mail size={14} />
              <span>Email Address: sale@mochawholesale.com</span>
            </a>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Location: 15401 Century Dr., Suite 301, Dearborn, MI 48120</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Navbar ── */}
      <nav className={`${mainNavBg} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center h-20 gap-2 sm:h-24 lg:h-32 lg:gap-4">

          {/* ── Left: Nav Links ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-start">
            {/* Home */}
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-2 text-white font-medium text-sm hover:text-coffee-200 transition-colors whitespace-nowrap"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div
              ref={desktopCategoriesRef}
              className="relative"
              onMouseEnter={openDesktopCategories}
              onMouseLeave={scheduleCloseDesktopCategories}
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopCategoriesOpen((v) => !v)
                }
                aria-haspopup="menu"
                aria-expanded={desktopCategoriesOpen}
                className="flex items-center gap-1 px-3 py-2 text-white font-medium text-sm hover:text-coffee-200 transition-colors whitespace-nowrap"
              >
                Categories
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    desktopCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {desktopCategoriesOpen && (
                <div
                  role="menu"
                  onMouseEnter={openDesktopCategories}
                  onMouseLeave={scheduleCloseDesktopCategories}
                  className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-white/15 shadow-2xl backdrop-blur-md ring-1 ring-black/5"
                  style={{ backgroundColor: "rgba(255,255,255,0.98)" }}
                >
                  <div className="py-2">
                    {CATEGORY_ORDER.map((key) => (
                      <Link
                        key={key}
                        href={`/products?group=${key}`}
                        role="menuitem"
                        onClick={closeDesktopCategories}
                        className="block px-4 py-2 text-sm text-gray-900 hover:bg-coffee-100 hover:text-coffee-700 transition-colors"
                      >
                        {CATEGORY_LABELS[key]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-white font-medium text-sm hover:text-coffee-200 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Center: Logo ── */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mocha Wholesale Logo"
              width={220}
              height={120}
              className="object-contain h-16 w-auto sm:h-20 lg:h-24"
              priority
            />
          </Link>

          {/* ── Right: Buttons + Icons ── */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <Link
              href="/wholesale"
              className="bg-[#5d4037] hover:bg-[#3e2723] text-white text-sm font-semibold px-4 py-2.5 rounded transition-colors whitespace-nowrap"
            >
              Request a Quote
            </Link>

            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-gray-900 text-sm font-semibold px-4 py-2.5 rounded border border-gray-300 transition-colors whitespace-nowrap"
            >
              Set an Appointment
            </Link>

            <button
              type="button"
              onClick={onOpenSearch}
              className="text-white hover:text-coffee-200 p-2 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/cart"
              className="text-white hover:text-coffee-200 p-2 relative transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5d4037] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <Link
              href="/account/login"
              className="text-white hover:text-coffee-200 p-2 transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            <button className="flex items-center gap-1 text-white hover:text-coffee-200 text-sm font-medium transition-colors">
              <Globe size={16} />
              <span>EN</span>
              <ChevronDown size={14} />
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-coffee-900 text-white px-4 pb-6 pt-2 space-y-1">
            {/* Home */}
            <Link
              href="/"
              className="block py-3 border-b border-coffee-800 text-sm font-medium hover:text-coffee-200 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Categories accordion */}
            <button
              type="button"
              onClick={() => setMobileCategoriesOpen((v) => !v)}
              aria-expanded={mobileCategoriesOpen}
              className="w-full flex items-center justify-between py-3 border-b border-coffee-800 text-sm font-medium hover:text-coffee-200 transition-colors"
            >
              Categories
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  mobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileCategoriesOpen && (
              <div className="pl-3 pb-2 space-y-1 border-b border-coffee-800">
                <Link
                  href="/products"
                  className="block py-2 text-sm font-semibold text-coffee-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                {CATEGORY_ORDER.map((key) => (
                  <Link
                    key={key}
                    href={`/products?group=${key}`}
                    className="block py-2 text-sm hover:text-coffee-200 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {CATEGORY_LABELS[key]}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 border-b border-coffee-800 text-sm font-medium hover:text-coffee-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/wholesale"
                className="bg-[#5d4037] text-white text-sm font-semibold px-4 py-3 rounded text-center"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="bg-white text-gray-900 text-sm font-semibold px-4 py-3 rounded border border-gray-300 text-center"
              >
                Set an Appointment
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <button
                type="button"
                onClick={onOpenSearch}
                className="text-white"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link href="/cart" className="text-white relative" aria-label="Cart">
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#5d4037] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              <Link href="/account/login" className="text-white" aria-label="Account">
                <User size={20} />
              </Link>
              <button className="flex items-center gap-1 text-white text-sm">
                <Globe size={16} />
                <span>EN</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
