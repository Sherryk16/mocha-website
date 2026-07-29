"use client";

import { useState } from "react";

export function ContactSection() {
  const [consent, setConsent] = useState(false);

  return (
    <section className="w-full bg-neutral-100 py-10 px-4 sm:py-16 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          <span className="text-[#5d4037]">Send Us</span>{" "}
          <span className="text-gray-900">a Message</span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base sm:text-lg">
          Tell us what your business needs, and we&apos;ll help you find
          practical wholesale café supply solutions.
        </p>

        <form className="mt-8 sm:mt-12 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <label className="block text-sm text-gray-800 mb-2">
                Full Name*
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-0 border-b border-gray-400 pb-2 focus:outline-none focus:border-[#5d4037]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-2">
                Email Address*
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-0 border-b border-gray-400 pb-2 focus:outline-none focus:border-[#5d4037]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-2">
                Message(s)
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-gray-400 pb-2 focus:outline-none focus:border-[#5d4037]"
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#5d4037]"
            />
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              I consent to the collection, use, storage, and processing of my
              personal and, where applicable, health-related information,
              including any data I submit on behalf of others, for the
              purpose of managing my inquiry, order, account, or
              subscription. This includes order fulfillment, payment
              processing, and customer service, in accordance with the{" "}
              <a href="/privacy" className="text-[#5d4037] font-semibold">
                Privacy Notice
              </a>
              .
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4">
            {/* Placeholder for a real reCAPTCHA widget */}
            <div className="border border-gray-300 rounded px-4 py-2 flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4" />
              I&apos;m not a robot
            </div>

            <button
              type="submit"
              disabled={!consent}
              className="border border-[#5d4037] text-[#5d4037] font-semibold px-8 py-3 rounded hover:bg-[#5d4037] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
