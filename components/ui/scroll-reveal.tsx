"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Direction = "left" | "right" | "up" | "down";

const HIDDEN_BY_DIRECTION: Record<Direction, string> = {
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
  up: "-translate-y-8 opacity-0",
  down: "translate-y-12 opacity-0",
};

const VISIBLE = "translate-x-0 translate-y-0 opacity-100";

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 700,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = As as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn(
        "will-change-transform transition-all ease-out",
        visible ? VISIBLE : HIDDEN_BY_DIRECTION[direction],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerChildren({
  children,
  gap = 80,
  direction = "up",
  duration = 600,
  className,
}: {
  children: React.ReactNode;
  gap?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
}) {
  return (
    <>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <ScrollReveal
              key={i}
              direction={direction}
              delay={i * gap}
              duration={duration}
              className={className}
            >
              {child}
            </ScrollReveal>
          ))
        : (
            <ScrollReveal
              direction={direction}
              duration={duration}
              className={className}
            >
              {children}
            </ScrollReveal>
          )}
    </>
  );
}
