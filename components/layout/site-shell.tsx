"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchDialog } from "@/components/layout/search-dialog";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main className="min-h-[60vh] flex-1 pt-[80px] sm:pt-[140px] lg:pt-[180px]">{children}</main>
      <Footer />

      <a
        href="https://wa.me/13132080888"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1ebe57]"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {searchOpen && (
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
      <CartDrawer />
    </>
  );
}
