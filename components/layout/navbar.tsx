"use client";
import { useState, useEffect } from "react";
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar({
  onOpenSearch,
}: {
  onOpenSearch?: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainNavBg = isHome
    ? scrolled
      ? "bg-gradient-to-b from-black/85 via-black/60 to-transparent"
      : "bg-transparent"
    : "bg-[#2d6a2d] border-b border-[#1f5a1f] shadow-md";

  const showTopBar = isHome ? !scrolled : true;

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* ── Top Bar (Green) ── */}
      {showTopBar && (
        <div className="hidden sm:block bg-[#2d6a2d] text-white text-sm py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <a
              href="tel:3132080888"
              className="flex items-center gap-2 hover:text-green-200 transition-colors"
            >
              <Phone size={14} />
              <span>Phone: 313-208-0888</span>
            </a>

            <a
              href="mailto:sale@mochawholesale.com"
              className="flex items-center gap-2 hover:text-green-200 transition-colors"
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
              {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-white font-medium text-sm hover:text-green-300 transition-colors whitespace-nowrap"
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
              className="bg-[#c2185b] hover:bg-[#9c0e4a] text-white text-sm font-semibold px-4 py-2.5 rounded transition-colors whitespace-nowrap"
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
              className="text-white hover:text-green-300 p-2 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/cart"
              className="text-white hover:text-green-300 p-2 relative transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c2185b] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <Link
              href="/account/login"
              className="text-white hover:text-green-300 p-2 transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            <button className="flex items-center gap-1 text-white hover:text-green-300 text-sm font-medium transition-colors">
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
          <div className="lg:hidden bg-[#1a3d1a] text-white px-4 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 border-b border-green-800 text-sm font-medium hover:text-green-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/wholesale"
                className="bg-[#c2185b] text-white text-sm font-semibold px-4 py-3 rounded text-center"
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
                  <span className="absolute -top-1 -right-1 bg-[#c2185b] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
