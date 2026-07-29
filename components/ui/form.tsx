import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...rest },
  ref
) {
  const inputId = id ?? rest.name;
  return (
    <label htmlFor={inputId} className="block">
      {label && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-coffee-700">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "block w-full rounded-md border border-coffee-200 bg-white px-3.5 py-2.5 text-sm text-coffee-900 placeholder:text-coffee-400 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500",
          error && "border-danger focus:border-danger focus:ring-danger",
          className
        )}
        {...rest}
      />
      {hint && !error && (
        <span className="mt-1 block text-xs text-coffee-500">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs font-medium text-danger">{error}</span>
      )}
    </label>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, hint, error, className, id, ...rest }, ref) {
    const inputId = id ?? rest.name;
    return (
      <label htmlFor={inputId} className="block">
        {label && (
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-coffee-700">
            {label}
          </span>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "block min-h-[120px] w-full rounded-md border border-coffee-200 bg-white px-3.5 py-2.5 text-sm text-coffee-900 placeholder:text-coffee-400 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500",
            error && "border-danger focus:border-danger focus:ring-danger",
            className
          )}
          {...rest}
        />
        {hint && !error && (
          <span className="mt-1 block text-xs text-coffee-500">{hint}</span>
        )}
        {error && (
          <span className="mt-1 block text-xs font-medium text-danger">{error}</span>
        )}
      </label>
    );
  }
);

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
  options: { label: string; value: string }[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, className, id, options, ...rest },
  ref
) {
  const inputId = id ?? rest.name;
  return (
    <label htmlFor={inputId} className="block">
      {label && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-coffee-700">
          {label}
        </span>
      )}
      <select
        ref={ref}
        id={inputId}
        className={cn(
          "block w-full rounded-md border border-coffee-200 bg-white px-3.5 py-2.5 text-sm text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500",
          error && "border-danger focus:border-danger focus:ring-danger",
          className
        )}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <span className="mt-1 block text-xs text-coffee-500">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs font-medium text-danger">{error}</span>
      )}
    </label>
  );
});
