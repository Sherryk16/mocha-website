import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/layout";
import {
  IconFacebook,
  IconInstagram,
  IconTikTok,
  IconWhatsApp,
} from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden pt-44 sm:pt-72">
      {/* Background image */}
      <Image
        src="/footer-bg1.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {/* Solid gap between page content and background image */}
      <div className="absolute inset-x-0 top-0 h-44 bg-transparent sm:h-72" />
      <div className="relative z-10">
        <Container className="grid grid-cols-1 gap-8 pt-12 pb-6 sm:gap-6 sm:pt-20 sm:pb-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
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

      <div className="relative z-10 border-t border-white/10">
        <Container className="grid grid-cols-1 gap-8 pt-8 pb-10 sm:grid-cols-2 sm:gap-10 sm:pb-14 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Mocha Wholesale"
                width={280}
                height={84}
                className="h-auto w-44 object-contain sm:w-64"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Michigan-based wholesale coffee & café supplier. From sourcing to
              shelf, we keep cafés, restaurants and offices brewing with
              confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SocialChip label="Facebook" href="https://facebook.com" />
              <SocialChip label="Instagram" href="https://instagram.com" />
              <SocialChip label="TikTok" href="https://tiktok.com" />
              <SocialChip
                label="WhatsApp"
                href="https://wa.me/13132080888"
              />
            </div>
          </div>
          <FooterColumn
            title="Shop"
            links={[
              { label: "All Products", href: "/products" },
              {
                label: "Premium Coffee",
                href: "/products?category=premium-coffee",
              },
              {
                label: "Premium Sauces",
                href: "/products?category=premium-sauces",
              },
              {
                label: "Premium Syrups",
                href: "/products?category=premium-syrups",
              },
              { label: "Matcha", href: "/products?category=matcha" },
            ]}
          />
          <FooterColumn
            title="Brands"
            links={[
              { label: "White Rhino Coffee", href: "/brands/white-rhino" },
              {
                label: "Barista Underground",
                href: "/brands/barista-underground",
              },
              {
                label: "Coffee Bean Corral",
                href: "/brands/coffee-bean-corral",
              },
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
      </div>

      <div className="relative z-10 border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-gray-400 sm:flex-row sm:gap-2">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Mocha Wholesale · 15401 Century Dr.,
            Suite 301, Dearborn, MI 48120
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Do not sell or share my personal information
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white">
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-200">
        {title}
      </p>
      {items ? (
        <ul className="mt-3 flex flex-wrap gap-2 sm:hidden">
          {items.map((it) => (
            <li
              key={it}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            >
              {it}
            </li>
          ))}
        </ul>
      ) : null}
      {items ? (
        <p className="mt-1 hidden text-base text-white sm:block sm:text-lg">
          {items.join(" · ")}
        </p>
      ) : null}
      {body ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-300">{body}</p>
      ) : null}
      {link ? (
        <Link
          href={link.href}
          className="mt-3 inline-block text-sm font-semibold text-white hover:text-coffee-200"
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-200">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-gray-300 hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const socialIcons: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  Facebook: IconFacebook,
  Instagram: IconInstagram,
  TikTok: IconTikTok,
  WhatsApp: IconWhatsApp,
};

function SocialChip({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const Icon = socialIcons[label];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 p-2.5 text-white transition hover:bg-[#5d4037] hover:scale-110"
      aria-label={label}
    >
      {Icon ? <Icon className="h-5 w-5" /> : label}
    </a>
  );
}
