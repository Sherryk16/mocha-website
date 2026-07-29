import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  as: As = "section",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <As className={cn("py-12 sm:py-16 lg:py-20", className)}>{children}</As>;
}

export function Heading({
  as: As = "h2",
  className,
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <As
      className={cn(
        "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
        className
      )}
    >
      {children}
    </As>
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] text-[#5d4037]",
        className
      )}
    >
      {children}
    </span>
  );
}
