"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const returnTo = params.get("return") ?? "/account/dashboard";
  const { signIn } = useAuth();
  const { setPricingMode } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(event.currentTarget);
    try {
      const user = await signIn({
        email: String(fd.get("email") ?? ""),
        password: String(fd.get("password") ?? ""),
      });
      if (user.role === "wholesale" && user.approved) {
        setPricingMode("wholesale");
      }
      router.push(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-8 sm:py-12 lg:py-16">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:rounded-3xl">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        {/* ── Left: marketing / illustration panel ── */}
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-coffee-400 via-coffee-700 to-coffee-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
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
              <span className="inline-block rounded-lg bg-white px-3 py-1 text-coffee-700 shadow-lg shadow-coffee-900/30">
                Welcome back.
              </span>
              <br />
              <span className="text-white">Your shelves are waiting.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-coffee-100/90">
              Sign in to manage orders, view invoices, and reorder the
              products your business depends on. Premium coffee, syrups,
              sauces and café essentials — all in one account.
            </p>
            <ul className="space-y-2.5 text-sm text-coffee-100/90">
              {[
                "Track orders & standing deliveries",
                "Reorder previous purchases in a click",
                "Manage EIN-verified wholesale partners",
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
              className="inline-flex items-center gap-2 text-xs font-semibold text-coffee-700 transition-colors hover:text-coffee-900"
            >
              ← Back
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Sign in
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              Continue managing your café, restaurant or office coffee
              program.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
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
                      "focus:border-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-700/20"
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-semibold text-coffee-700 transition-colors hover:text-coffee-900"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Your password"
                    className={cn(
                      "block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400",
                      "focus:border-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-700/20"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
                {loading ? "Signing in…" : "Sign in"}
              </Button>

              <p className="text-center text-sm text-gray-700">
                New here?{" "}
                <Link
                  href="/account/register"
                  className="font-semibold text-coffee-700 transition-colors hover:text-coffee-900"
                >
                  Create an account
                </Link>
              </p>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                Looking for wholesale?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Anyone can create an account and browse retail pricing.
                To access wholesale pricing, apply with your EIN.{" "}
                <Link
                  href="/wholesale"
                  className="font-semibold text-coffee-700 underline underline-offset-2 transition-colors hover:text-coffee-900"
                >
                  Apply for wholesale
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
}
