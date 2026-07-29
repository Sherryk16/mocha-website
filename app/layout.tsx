import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { SiteShell } from "@/components/layout/site-shell";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mocha Wholesale · Coffee & Café Supply in Dearborn, MI",
    template: "%s · Mocha Wholesale",
  },
  description:
    "Wholesale coffee, sauces, syrups and café essentials. Sourced for cafés, restaurants, bakeries and offices. Apply for a wholesale account to unlock member pricing.",
  metadataBase: new URL("https://mochawholesale.com"),
  keywords: [
    "wholesale coffee",
    "café supply",
    "Dearborn coffee",
    "espresso beans",
    "Biscoff wholesale",
    "matcha wholesale",
  ],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Mocha Wholesale",
    description:
      "Michigan-based wholesale coffee & café supplier. Apply for wholesale pricing and standing orders.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#231810",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <SiteShell>{children}</SiteShell>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
