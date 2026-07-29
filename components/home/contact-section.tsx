"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { Input, Textarea } from "@/components/ui/form";
import { IconCheck } from "@/components/ui/icons";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section className="py-16">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-white">Tell us what your business needs.</h2>
          <p className="mt-3 max-w-md text-gray-200">
            We'll help you find practical wholesale café supply solutions —
            whether you're opening a new café, updating your menu or stocking
            an office coffee station.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-gray-200">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Phone
              </p>
              <a href="tel:+13132080888" className="font-semibold text-white">
                313-208-0888
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Email
              </p>
              <a
                href="mailto:sale@mochawholesale.com"
                className="font-semibold text-white"
              >
                sale@mochawholesale.com
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Location
              </p>
              <p className="font-semibold text-white">
                15401 Century Dr., Suite 301, Dearborn, MI 48120
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">
                <IconCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-coffee-900">
                Thanks — we'll be in touch.
              </h3>
              <p className="mt-2 max-w-xs text-sm text-coffee-700">
                A member of our wholesale team will reach out within one
                business day.
              </p>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="name"
                  label="Your name"
                  required
                  placeholder="Jane Doe"
                />
                <Input
                  name="company"
                  label="Business"
                  placeholder="Café, restaurant, etc."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  required
                  placeholder="you@business.com"
                />
                <Input
                  name="phone"
                  type="tel"
                  label="Phone"
                  placeholder="(555) 555-5555"
                />
              </div>
              <Textarea
                name="message"
                label="What can we help with?"
                required
                placeholder="Tell us about your menu, your volume, or what you're trying to source."
              />
              <label className="flex items-start gap-3 text-xs text-coffee-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-coffee-300 text-coffee-800 focus:ring-coffee-500"
                  required
                />
                <span>
                  I consent to the collection, use, storage and processing of
                  my information for the purpose of managing my inquiry, in
                  accordance with the Privacy Notice.
                </span>
              </label>
              <Button
                type="submit"
                size="lg"
                disabled={!consent || submitting}
              >
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
