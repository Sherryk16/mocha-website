"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="rounded-2xl border border-coffee-200 bg-white p-8 smooth-shadow">
      <h1 className="font-display text-2xl font-bold text-coffee-900">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-coffee-600">
        Free for retail. Approved wholesale accounts unlock member pricing.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="firstName" label="First name" required />
          <Input name="lastName" label="Last name" required />
        </div>
        <Input name="email" type="email" label="Email" required />
        <Input
          name="password"
          type="password"
          label="Password"
          required
          hint="At least 8 characters."
        />
        {error && (
          <p className="rounded-md bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-coffee-700">
        Have an account?{" "}
        <Link
          href="/account/login"
          className="font-semibold text-coffee-800 underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
