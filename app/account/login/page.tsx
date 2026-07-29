"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

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
    <div className="rounded-2xl border border-coffee-200 bg-white p-8 smooth-shadow">
      <h1 className="font-display text-2xl font-bold text-coffee-900">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-coffee-600">
        Sign in to apply your approved wholesale pricing and view standing
        orders.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <Input name="email" type="email" label="Email" required autoFocus />
        <Input
          name="password"
          type="password"
          label="Password"
          required
        />
        {error && (
          <p className="rounded-md bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-coffee-700">
        New here?{" "}
        <Link
          href="/account/register"
          className="font-semibold text-coffee-800 underline"
        >
          Create an account
        </Link>
      </p>
      <div className="mt-6 rounded-xl border border-dashed border-coffee-300 bg-coffee-50 p-4 text-xs text-coffee-700">
        <p className="font-semibold text-coffee-900">Want wholesale pricing?</p>
        <p className="mt-1">
          Anyone can create an account and browse retail pricing. To unlock
          member pricing,{" "}
          <Link href="/wholesale" className="font-semibold underline">
            apply for a wholesale account
          </Link>{" "}
          with your EIN.
        </p>
      </div>
    </div>
  );
}
