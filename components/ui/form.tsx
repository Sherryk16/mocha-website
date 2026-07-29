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
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "block w-full rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#5d4037] focus:outline-none focus:ring-1 focus:ring-[#5d4037]",
          error &&
            "border-coffee-700 focus:border-coffee-700 focus:ring-coffee-700",
          className
        )}
        {...rest}
      />
      {hint && !error && (
        <span className="mt-1 block text-xs text-gray-500">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs font-medium text-red-600">
          {error}
        </span>
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
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
            {label}
          </span>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "block min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#5d4037] focus:outline-none focus:ring-1 focus:ring-[#5d4037]",
            error &&
              "border-coffee-700 focus:border-coffee-700 focus:ring-coffee-700",
            className
          )}
          {...rest}
        />
        {hint && !error && (
          <span className="mt-1 block text-xs text-gray-500">{hint}</span>
        )}
        {error && (
          <span className="mt-1 block text-xs font-medium text-red-600">
            {error}
          </span>
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
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
          {label}
        </span>
      )}
      <select
        ref={ref}
        id={inputId}
        className={cn(
          "block w-full rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#5d4037] focus:outline-none focus:ring-1 focus:ring-[#5d4037]",
          error &&
            "border-coffee-700 focus:border-coffee-700 focus:ring-coffee-700",
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
        <span className="mt-1 block text-xs text-gray-500">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
});
