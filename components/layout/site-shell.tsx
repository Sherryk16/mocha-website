"use client";

import { useState } from "react";

import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchDialog } from "@/components/layout/search-dialog";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex-1 pt-[140px]">{children}</main>
      <Footer />
      {searchOpen && (
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
      <CartDrawer />
    </>
  );
}
