"use client";

import { forwardRef } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2185b] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#c2185b] text-white hover:bg-[#9c0e4a] shadow-sm hover:shadow-md",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
  ghost:
    "bg-transparent text-gray-900 hover:bg-gray-100",
  outline:
    "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100",
  danger: "bg-red-700 text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type LinkButtonProps = CommonProps & {
  href: string;
  prefetch?: boolean;
};

function classesForCommon({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: CommonProps) {
  return cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref
) {
  const { className, variant, size, fullWidth, children, ...rest } = props;
  return (
    <button
      ref={ref}
      className={classesForCommon({ variant, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </button>
  );
});

export function LinkButton({
  href,
  prefetch,
  variant,
  size,
  fullWidth,
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={classesForCommon({
        variant,
        size,
        fullWidth,
        className,
      })}
    >
      {children}
    </Link>
  );
}
