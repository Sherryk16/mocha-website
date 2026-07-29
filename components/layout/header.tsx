"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/layout";
import {
  IconCart,
  IconMenu,
  IconSearch,
  IconUser,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Shop All" },
  { href: "/brands", label: "Brands" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  onOpenMobileMenu,
  onOpenSearch,
}: {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}) {
  const { count } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={cn(
      "z-40 bg-transparent",
      isHome ? "absolute top-0 left-0 right-0" : "sticky top-0"
    )}>
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md",
              isHome ? "text-white hover:bg-white/10" : "text-coffee-900 hover:bg-coffee-100"
            )}
            aria-label="Open menu"
          >
            <IconMenu className="h-6 w-6" />
          </button>
          <Link href="/" className="lg:hidden">
            <Logo onDark={isHome} />
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1">
          <Link href="/">
            <Logo onDark={isHome} />
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold tracking-wide transition",
                  isHome
                    ? `text-white hover:bg-white/10 ${active ? "bg-white/10" : ""}`
                    : `text-coffee-800 hover:bg-coffee-100 ${active ? "bg-coffee-100" : ""}`
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full",
              isHome ? "text-white hover:bg-white/10" : "text-coffee-800 hover:bg-coffee-100"
            )}
            aria-label="Search"
          >
            <IconSearch className="h-5 w-5" />
          </button>
          <Link
            href={user ? "/account/dashboard" : "/account/login"}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold",
              isHome ? "text-white hover:bg-white/10" : "text-coffee-800 hover:bg-coffee-100"
            )}
            aria-label="Account"
          >
            <IconUser className="h-5 w-5" />
            <span className="hidden lg:inline">
              {user ? user.firstName : "Sign In"}
            </span>
          </Link>
          <Link
            href="/cart"
            className={cn(
              "relative inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold",
              isHome
                ? "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                : "bg-coffee-800 text-coffee-50 hover:bg-coffee-900"
            )}
            aria-label="Cart"
          >
            <IconCart className="h-5 w-5" />
            <span className="hidden lg:inline">Cart</span>
            {count > 0 && (
              <span className={cn(
                "absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold",
                isHome ? "bg-white text-coffee-900" : "bg-accent text-coffee-900"
              )}>
                {count}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </header>
  );
}

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        onDark ? "bg-white text-coffee-900" : "bg-coffee-800 text-coffee-50"
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12c0-3 3-5 6-5s6 2 6 5-3 5-6 5c-1.5 0-3-.5-4-1.5L4 19c-.5.5-1.5 0-1.5-1L4 13"
          />
          <circle cx={10} cy={6} r={1.4} fill="currentColor" stroke="none" />
        </svg>
      </span>
      <div className="leading-tight">
        <div className={cn(
          "font-display text-xl font-bold",
          onDark ? "text-white" : "text-coffee-900"
        )}>
          Mocha Wholesale
        </div>
        <div className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.22em]",
          onDark ? "text-white/80" : "text-coffee-600"
        )}>
          Coffee & Café Supply
        </div>
      </div>
    </div>
  );
}
