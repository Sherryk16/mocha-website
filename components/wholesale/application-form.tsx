"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/form";
import { IconArrowRight, IconCheck, IconShield } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { cn, formatEIN, isValidEIN } from "@/lib/utils";

const BUSINESS_TYPES = [
  "Café / Coffee shop",
  "Restaurant / Bakery",
  "Office / Corporate",
  "Hotel / Hospitality",
  "Grocery / Market",
  "Other food service",
];

export function WholesaleApplicationForm() {
  const { user, submitWholesaleApplication } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [einInput, setEinInput] = useState("");
  const [consent, setConsent] = useState(false);

  const einValid = isValidEIN(einInput);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      businessName: String(formData.get("businessName") ?? ""),
      ein: formatEIN(einInput),
      businessType: String(formData.get("businessType") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      zip: String(formData.get("zip") ?? ""),
      notes: String(formData.get("notes") ?? "") || undefined,
    };
    await new Promise((r) => setTimeout(r, 800));
    await submitWholesaleApplication(payload);
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-coffee-700 text-white">
          <IconCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-3xl font-bold text-gray-900">
          Application received.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
          Thanks! Our wholesale desk will verify your EIN and respond within
          one business day. You'll see member pricing as soon as your account
          is approved.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Submitted under{" "}
          <span className="font-semibold">{user?.email ?? "your account"}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Stepper step={step} />

      {step === 1 && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Tell us about your business
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            We'll use this to verify your standing as a licensed business.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              name="businessName"
              label="Legal business name"
              required
              placeholder="The Daily Pour LLC"
            />
            <Select
              name="businessType"
              label="Business type"
              required
              defaultValue=""
              options={[
                { value: "", label: "Select business type" },
                ...BUSINESS_TYPES.map((b) => ({ value: b, label: b })),
              ]}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Input
              name="address"
              label="Street address"
              required
              className="sm:col-span-2"
              placeholder="15401 Century Dr."
            />
            <Input name="city" label="City" required placeholder="Dearborn" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Select
              name="state"
              label="State"
              required
              defaultValue="MI"
              options={[
                { value: "MI", label: "Michigan" },
                { value: "OH", label: "Ohio" },
                { value: "IN", label: "Indiana" },
                { value: "IL", label: "Illinois" },
                { value: "WI", label: "Wisconsin" },
                { value: "Other", label: "Other" },
              ]}
            />
            <Input name="zip" label="ZIP" required placeholder="48120" />
            <Input
              name="phone"
              type="tel"
              label="Business phone"
              required
              placeholder="(313) 555-5555"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              name="contactName"
              label="Primary contact"
              required
              placeholder="Jane Doe"
            />
            <Input
              name="email"
              type="email"
              label="Email"
              required
              defaultValue={user?.email}
              placeholder="you@business.com"
            />
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              size="lg"
              onClick={() => setStep(2)}
            >
              Continue
              <IconArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coffee-700/10 text-coffee-700">
              <IconShield className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Verify your EIN
              </h2>
              <p className="text-sm text-gray-600">
                Federal Employer Identification Number. We'll verify against
                IRS records.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="ein" className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                EIN (9 digits)
              </span>
              <input
                id="ein"
                name="ein"
                value={einInput}
                onChange={(e) =>
                  setEinInput(formatEIN(e.target.value).slice(0, 10))
                }
                placeholder="38-1234567"
                inputMode="numeric"
                className={cn(
                  "block w-full rounded-md border border-gray-200 bg-white px-3.5 py-2.5 font-mono text-base text-gray-900 placeholder:text-gray-400 focus:border-[#5d4037] focus:outline-none focus:ring-1 focus:ring-[#5d4037]",
                  einInput.length > 0 &&
                    !einValid &&
                    "border-coffee-700 focus:border-coffee-700 focus:ring-coffee-700"
                )}
              />
              <span
                className={cn(
                  "mt-1 block text-xs",
                  einInput.length === 0 && "text-gray-500",
                  einValid && "text-coffee-700",
                  einInput.length > 0 && !einValid && "text-red-600"
                )}
              >
                {einInput.length === 0
                  ? "Format: 12-3456789 (2 digits, dash, 7 digits)"
                  : einValid
                    ? "Looks good. EIN format is valid."
                    : "Invalid EIN. Check the 2-digit prefix and length."}
              </span>
            </label>
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700">
              <p className="font-semibold text-gray-900">
                What we'll do with your EIN
              </p>
              <p className="mt-1">
                We use your EIN to confirm your business with the IRS and to
                issue standing-order terms. We never publish or sell your
                business information.
              </p>
            </div>
          </div>

          <Textarea
            name="notes"
            className="mt-4"
            label="Anything we should know?"
            hint="Monthly volume, current suppliers, target opening date — whatever helps us help you."
            placeholder="We open in August, expect ~150 lbs of espresso per week."
          />

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
            >
              ← Back
            </Button>
            <Button
              type="button"
              size="lg"
              disabled={!einValid}
              onClick={() => setStep(3)}
            >
              Continue
              <IconArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Review &amp; submit</h2>
          <p className="mt-1 text-sm text-gray-600">
            One last check before we send this to our wholesale desk.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <ReviewField label="EIN" value={formatEIN(einInput)} />
            <ReviewField
              label="Email"
              value={user?.email ?? "—"}
            />
          </div>
          <label className="mt-6 flex items-start gap-3 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#5d4037] focus:ring-[#5d4037]"
              required
            />
            <span>
              I confirm I'm authorized to apply for a wholesale account on
              behalf of this business, and I consent to verification of the
              information above. I agree to Mocha Wholesale's Terms and Privacy
              Notice.
            </span>
          </label>
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
            >
              ← Back
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={!consent || submitting}
            >
              {submitting ? "Submitting…" : "Submit application"}
            </Button>
          </div>
        </section>
      )}
    </form>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Business" },
    { n: 2, label: "EIN" },
    { n: 3, label: "Review" },
  ];
  return (
    <ol className="flex items-center gap-3 text-xs">
      {steps.map((s, i) => (
        <li key={s.n} className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold transition",
              step >= s.n
                ? "border-[#5d4037] bg-[#5d4037] text-white"
                : "border-gray-300 bg-white text-gray-400"
            )}
          >
            {s.n}
          </span>
          <span
            className={cn(
              "font-semibold",
              step >= s.n ? "text-gray-900" : "text-gray-400"
            )}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span
              className={cn(
                "ml-2 h-px w-10 transition sm:w-16",
                step > s.n ? "bg-[#5d4037]" : "bg-gray-300"
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
