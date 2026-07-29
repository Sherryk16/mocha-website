"use client";

import { useState } from "react";

export function ContactSection() {
  const [consent, setConsent] = useState(false);

  return (
    <section className="w-full bg-neutral-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          <span className="text-[#c2185b]">Send Us</span>{" "}
          <span className="text-gray-900">a Message</span>
        </h2>
        <p className="mt-3 text-gray-600 text-base sm:text-lg">
          Tell us what your business needs, and we&apos;ll help you find
          practical wholesale café supply solutions.
        </p>

        <form className="mt-12 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm text-gray-800 mb-2">
                Full Name*
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-0 border-b border-gray-400 pb-2 focus:outline-none focus:border-[#c2185b]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-2">
                Email Address*
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-0 border-b border-gray-400 pb-2 focus:outline-none focus:border-[#c2185b]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-2">
                Message(s)
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-gray-400 pb-2 focus:outline-none focus:border-[#c2185b]"
              />
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#c2185b]"
            />
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              I consent to the collection, use, storage, and processing of my
              personal and, where applicable, health-related information,
              including any data I submit on behalf of others, for the
              purpose of managing my inquiry, order, account, or
              subscription. This includes order fulfillment, payment
              processing, and customer service, in accordance with the{" "}
              <a href="/privacy" className="text-[#c2185b] font-semibold">
                Privacy Notice
              </a>
              .
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
            {/* Placeholder for a real reCAPTCHA widget */}
            <div className="border border-gray-300 rounded px-4 py-2 flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4" />
              I&apos;m not a robot
            </div>

            <button
              type="submit"
              disabled={!consent}
              className="border border-[#c2185b] text-[#c2185b] font-semibold px-8 py-3 rounded hover:bg-[#c2185b] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
