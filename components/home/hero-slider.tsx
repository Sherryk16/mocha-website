"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { IconArrowRight } from "@/components/ui/icons";

const SLIDES = [
  {
    image: "/bg5.png",
    title: "Welcome to Port Mocha",
    body: "Premium coffee wholesale for cafés, restaurants, and offices. Fresh-roasted beans delivered direct to your door.",
  },
  {
    image: "/bg4.png",
    title: "Your Partner in Premium Coffee",
    body: "Single-origin beans and signature blends roasted weekly. Built for cafés that won't compromise on quality.",
  },
  {
    image: "/bg2.png",
    title: "Crafted for the Working Barista",
    body: "Espresso profiles calibrated for high-volume service and built to perform on a busy bar.",
  },
  {
    image: "/bg3.png",
    title: "Honest Beans. No Shortcuts.",
    body: "Direct-trade green coffee from single-estate farms, with full traceability from cherry to cup.",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative -mt-[80px] h-[480px] overflow-hidden sm:-mt-[140px] sm:h-[580px] lg:-mt-[180px] lg:h-[740px]">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="relative z-10 flex h-full items-center pt-[80px] sm:pt-[140px] lg:pt-[180px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            key={index}
            className="max-w-xl animate-fade-in"
          >
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {SLIDES[index].title}
            </h1>
            <p className="mt-3 text-base text-gray-100 sm:mt-4 sm:text-lg">
              {SLIDES[index].body}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#5d4037] px-6 text-sm font-semibold text-white hover:bg-[#3e2723]"
              >
                Shop Coffee
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex h-11 items-center justify-center gap-2 rounded border-2 border-white bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                Apply for Wholesale
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
