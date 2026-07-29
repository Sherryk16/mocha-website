import Link from "next/link";

import { Container } from "@/components/ui/layout";

export function Footer() {
  return (
    <footer className="bg-coffee-900 text-coffee-100">
      <div className="bg-coffee-800">
        <Container className="grid grid-cols-1 gap-6 py-10 md:grid-cols-4">
          <FooterCell
            title="We work with"
            items={["HOLLANDER", "MONIN", "1883", "GHIRARDELLI"]}
          />
          <FooterCell
            title="Same-day shipping"
            body="Order by 2pm ET for next-day delivery across Michigan, Ohio and Indiana."
          />
          <FooterCell
            title="Wholesale specialists"
            body="Apply with your EIN to unlock member pricing and standing orders."
            link={{ href: "/wholesale", label: "Apply now →" }}
          />
          <FooterCell
            title="Talk to a real person"
            body="Mon–Fri · 8am – 6pm ET"
            link={{ href: "tel:+13132080888", label: "313-208-0888" }}
          />
        </Container>
      </div>
      <Container className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="font-display text-2xl font-bold text-coffee-50">
            Mocha Wholesale
          </div>
          <p className="mt-3 text-sm text-coffee-200">
            Michigan-based wholesale coffee & café supplier. From sourcing to
            shelf, we keep cafés, restaurants and offices brewing with confidence.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <SocialChip label="Facebook" />
            <SocialChip label="Instagram" />
            <SocialChip label="TikTok" />
            <SocialChip label="WhatsApp" />
          </div>
        </div>
        <FooterColumn
          title="Shop"
          links={[
            { label: "All Products", href: "/products" },
            { label: "Premium Coffee", href: "/products?category=premium-coffee" },
            { label: "Premium Sauces", href: "/products?category=premium-sauces" },
            { label: "Premium Syrups", href: "/products?category=premium-syrups" },
            { label: "Matcha", href: "/products?category=matcha" },
          ]}
        />
        <FooterColumn
          title="Brands"
          links={[
            { label: "White Rhino Coffee", href: "/brands/white-rhino" },
            { label: "Barista Underground", href: "/brands/barista-underground" },
            { label: "Coffee Bean Corral", href: "/brands/coffee-bean-corral" },
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            { label: "About Us", href: "/about" },
            { label: "Wholesale Application", href: "/wholesale" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Notice", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
          ]}
        />
      </Container>
      <div className="border-t border-coffee-800/60">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-coffee-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Mocha Wholesale · 15401 Century Dr., Suite 301, Dearborn, MI 48120</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-coffee-100">
              Do not sell or share my personal information
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-coffee-100">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCell({
  title,
  body,
  items,
  link,
}: {
  title: string;
  body?: string;
  items?: string[];
  link?: { href: string; label: string };
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {title}
      </p>
      {items ? (
        <p className="mt-2 font-display text-lg text-coffee-50">{items.join(" · ")}</p>
      ) : null}
      {body ? <p className="mt-2 text-sm text-coffee-200">{body}</p> : null}
      {link ? (
        <Link
          href={link.href}
          className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
        >
          {link.label}
        </Link>
      ) : null}
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-coffee-200 hover:text-coffee-50">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialChip({ label }: { label: string }) {
  return (
    <span className="inline-flex h-9 items-center justify-center rounded-full bg-coffee-700 px-3 text-xs font-semibold text-coffee-100">
      {label}
    </span>
  );
}
