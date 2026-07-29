import Link from "next/link";

import { Container } from "@/components/ui/layout";
import { IconArrowRight, IconPhone, IconMail, IconMapPin } from "@/components/ui/icons";

export function AnnouncementBar() {
  return (
    <div className="bg-coffee-900 text-coffee-50">
      <div className="overflow-hidden">
        <Container className="py-2.5">
          <div className="flex items-center justify-between gap-6 text-xs sm:text-sm">
            <div className="hidden items-center gap-5 md:flex">
              <span className="flex items-center gap-2">
                <IconPhone className="h-3.5 w-3.5" />
                <a href="tel:+13132080888" className="hover:underline">
                  313-208-0888
                </a>
              </span>
              <span className="flex items-center gap-2">
                <IconMail className="h-3.5 w-3.5" />
                <a href="mailto:sale@mochawholesale.com" className="hover:underline">
                  sale@mochawholesale.com
                </a>
              </span>
              <span className="hidden items-center gap-2 lg:flex">
                <IconMapPin className="h-3.5 w-3.5" />
                Dearborn, MI · Wholesale & Retail
              </span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-3">
              <span className="hidden sm:inline">
                Free shipping on wholesale orders over $250
              </span>
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-accent-soft hover:text-coffee-900"
              >
                Apply for wholesale
                <IconArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
