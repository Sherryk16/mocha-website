import Image from "next/image";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function WelcomeSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Section background image — full width behind both text and image */}
      <Image
        src="/sectionbg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/55" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[1fr_1.5fr] md:gap-12 md:py-16 lg:px-8 lg:py-20">
        {/* Left: text — slides in from left */}
        <ScrollReveal
          direction="left"
          duration={800}
          className="flex flex-col justify-center"
        >
          <p className="mb-1 text-sm font-semibold text-gray-700 sm:text-base">
            Welcome to
          </p>

          <h2 className="leading-[1.05]">
            <span className="block text-3xl font-extrabold text-[#c2185b] sm:text-4xl md:text-5xl">
              Port Mocha
            </span>
            <span className="block text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
              Wholesale
            </span>
          </h2>

          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-gray-700 sm:text-base">
            We understand the daily pressures of keeping customers satisfied,
            maintaining consistent drink quality, and managing inventory
            without delays, which is why our clients rely on steady
            deliveries and practical product guidance.
          </p>

          <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-gray-600 sm:block">
            Whether you're opening a new café, updating your beverage menu, or
            stocking an office coffee station, we'll help you choose products
            that fit your workflow, equipment, and customer expectations.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/products"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#c2185b] px-6 text-sm font-bold text-white shadow-md shadow-pink-900/20 transition-all duration-300 hover:scale-[1.03] hover:bg-[#9c0e4a]"
            >
              Shop Now
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="/wholesale"
              className="inline-flex h-11 items-center justify-center rounded-full border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 transition-all duration-300 hover:scale-[1.03] hover:bg-gray-100"
            >
              Apply for Wholesale
            </a>
          </div>
        </ScrollReveal>

        {/* Right: image — slides in from right, no box, no bg */}
        <ScrollReveal
          direction="right"
          duration={900}
          delay={120}
          className="relative order-first flex items-center justify-center md:order-last"
        >
          <Image
            src="/image.png"
            alt="Port Mocha Wholesale products"
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-auto w-full animate-float"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export default WelcomeSection;
