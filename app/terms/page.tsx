import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Legal</Eyebrow>
        <Heading className="mt-2">Terms of Service.</Heading>
        <p className="mt-3 text-xs text-coffee-600">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="mt-8 space-y-5 text-coffee-800">
          <p>
            These Terms of Service govern your use of the Mocha Wholesale
            website and wholesale program. By creating an account or placing an
            order, you agree to these terms.
          </p>
          <h3 className="font-display text-lg font-bold text-coffee-900">
            Wholesale accounts
          </h3>
          <p>
            Wholesale pricing is reserved for verified businesses. By applying
            for a wholesale account, you confirm that you are authorized to
            apply on behalf of the business and that the EIN provided is
            accurate. We reserve the right to verify EINs against IRS records
            and to revoke member pricing for accounts that no longer qualify.
          </p>
          <h3 className="font-display text-lg font-bold text-coffee-900">
            Orders &amp; shipping
          </h3>
          <p>
            Standing orders and member pricing are subject to inventory and
            product availability. We confirm pricing and shipping at the time
            of order acknowledgment. Title and risk of loss pass to the buyer
            upon delivery to the carrier.
          </p>
          <h3 className="font-display text-lg font-bold text-coffee-900">
            Returns
          </h3>
          <p>
            Wholesale returns are handled case-by-case. Reach out to our
            wholesale desk within 14 days of receipt for any damaged or
            defective product.
          </p>
          <p className="!mt-8">
            Questions about these terms?{" "}
            <Link
              href="mailto:sale@mochawholesale.com"
              className="font-semibold text-coffee-800 underline"
            >
              Email the wholesale desk
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
