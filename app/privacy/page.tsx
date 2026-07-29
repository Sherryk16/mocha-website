import Link from "next/link";
import type { Metadata } from "next";

import { Container, Eyebrow, Heading } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Privacy Notice",
};

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Legal</Eyebrow>
        <Heading className="mt-2">Privacy Notice.</Heading>
        <p className="mt-3 text-xs text-gray-500">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="mt-8 max-w-none space-y-5 text-gray-800">
          <p>
            This is a demo storefront for a Next.js scaffold. Replace this
            content with your actual privacy policy before going live. Mocha
            Wholesale collects the information you submit on our wholesale
            application, checkout, and contact forms strictly to operate your
            account and fulfill orders.
          </p>
          <h3 className="mt-2 text-lg font-bold text-gray-900">
            What we collect
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-gray-800">
            <li>Account email, name, and password (hashed).</li>
            <li>
              Wholesale application data — business name, address, EIN, contact
              information.
            </li>
            <li>Order history, shipping address and contact details.</li>
          </ul>
          <h3 className="mt-2 text-lg font-bold text-gray-900">
            How we use it
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-gray-800">
            <li>To verify your EIN against the IRS records.</li>
            <li>To process and ship wholesale orders.</li>
            <li>To send order updates and wholesale desk notifications.</li>
          </ul>
          <p className="mt-2">
            Want a copy of your data or to close your account?{" "}
            <Link
              href="mailto:sale@mochawholesale.com"
              className="font-semibold text-[#5d4037] underline"
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
