"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const fd = new FormData(event.currentTarget);
    const firstName = String(fd.get("firstName") ?? "");
    const lastName = String(fd.get("lastName") ?? "");
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await signUp({ firstName, lastName, email, password });
      router.push("/account/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-8 sm:py-12 lg:py-16">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:rounded-3xl">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          {/* ── Left: marketing / illustration panel ── */}
          <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#5d4037] via-[#3e2723] to-[#1b0f0a] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.4), transparent 35%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25), transparent 40%)",
              }}
            />
            <div className="relative z-10">
              <Link href="/" className="inline-block transition-opacity hover:opacity-80">
<Image
                src="/logo.png"
                alt="Mocha Wholesale"
                width={300}
                height={84}
                className="h-16 w-auto brightness-0 invert"
              />
              </Link>
            </div>

            <div className="relative z-10 mt-12 space-y-6">
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                Create your account.
                <br />
                Built for your bar.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-coffee-100/90">
                One account for retail browsing, order history, and wholesale
                applications. Manage every café, restaurant or office location
                from a single dashboard.
              </p>
              <ul className="space-y-2.5 text-sm text-coffee-100/90">
                {[
                  "Save products & reorder in one click",
                  "Early access to seasonal offerings",
                  "Apply for wholesale pricing anytime",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <p className="relative z-10 mt-12 text-xs text-coffee-100/70">
              Michigan-based wholesale coffee & café supplier since 2018 ·{" "}
              <Link href="/" className="underline hover:text-white">
                Back to home
              </Link>
            </p>
          </aside>

          {/* ── Right: form ── */}
          <div className="p-8 sm:p-12">
            <div className="mx-auto max-w-md">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-coffee-600 transition-colors hover:text-[#3e2723]"
              >
                ← Back
              </Link>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Create account
              </h1>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Free to join. Wholesale pricing is added once your account is
                approved.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="First name"
                    name="firstName"
                    placeholder="Jane"
                    icon={<User className="h-4 w-4" />}
                    required
                  />
                  <Field
                    label="Last name"
                    name="lastName"
                    placeholder="Doe"
                    icon={<User className="h-4 w-4" />}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative mt-1">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoFocus
                      placeholder="you@business.com"
                      className={cn(
                        "block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400",
                        "focus:border-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/20"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className={cn(
                        "block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400",
                        "focus:border-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/20"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Use at least 8 characters.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" disabled={loading} fullWidth>
                  {loading ? "Creating account…" : "Create account"}
                </Button>

                <p className="text-center text-sm text-gray-700">
                  Have an account?{" "}
                  <Link
                    href="/account/login"
                    className="font-semibold text-[#5d4037] transition-colors hover:text-[#3e2723]"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function Field({
  label,
  name,
  icon,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          required={required}
          className={cn(
            "block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400",
            "focus:border-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/20"
          )}
        />
      </div>
    </div>
  );
}
