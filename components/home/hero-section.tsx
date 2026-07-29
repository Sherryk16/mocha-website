"use client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const SLIDES = ["/bg.png", "/bg1.png", "/bg2.png", "/bg3.png"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-center"
          />
        </div>
      ))}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-24">

          {/* ── Left: Text ── */}
          <div className="max-w-xl">
            <p className="text-white text-xl lg:text-2xl font-medium mb-1">
              Welcome to
            </p>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-4">
              <span className="text-[#c0392b]">Port Mocha</span>
              <br />
              <span className="text-white">Wholesale</span>
            </h1>
            <div className="w-16 h-1 bg-[#c0392b] mb-6" />
            <p className="text-white text-base lg:text-lg leading-relaxed font-semibold mb-5">
              We understand the daily pressures of keeping customers satisfied,
              maintaining consistent drink quality, and managing inventory without
              delays, which is why our clients rely on steady deliveries and
              practical product guidance.
            </p>
            <p className="text-white text-base lg:text-lg leading-relaxed mb-8">
              Whether you are opening a new café, updating your beverage menu, or
              stocking an office coffee station, we help you choose products that
              fit your workflow, equipment, and customer expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/wholesale"
                className="bg-[#c0392b] hover:bg-[#a93226] text-white font-bold px-8 py-3 rounded transition-colors text-sm lg:text-base"
              >
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-3 rounded border border-gray-300 transition-colors text-sm lg:text-base"
              >
                Browse Products
              </Link>
            </div>
          </div>

          {/* ── Right: Product Image ── */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl">
              <Image
                src="/image.png"
                alt="Mocha Wholesale Products"
                width={800}
                height={600}
                className="object-contain w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── WhatsApp Button ── */}
      <a
        href="https://wa.me/13132080888"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors text-sm"
      >
        <MessageCircle size={20} />
        Chat with us on WhatsApp
      </a>

    </section>
  );
}
