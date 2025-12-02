"use client";

import { motion } from "framer-motion";

type Props = {
  businessName: string;
  currency: string;
  onBusinessNameChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
};

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

export function StepIdentity({
  businessName,
  currency,
  onBusinessNameChange,
  onCurrencyChange,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Let&apos;s make this official.
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          This will appear on every invoice. Make it sound expensive.
        </motion.p>
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-[var(--foreground)]/70 mb-2"
          >
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => onBusinessNameChange(e.target.value)}
            placeholder="Acme Corp, Jane Doe Design..."
            className="w-full px-4 py-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] transition-colors text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-[var(--foreground)]/70 mb-2"
          >
            Primary Currency
          </label>
          <div className="grid grid-cols-5 gap-2">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => onCurrencyChange(c.code)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  currency === c.code
                    ? "border-[var(--primary)] bg-[var(--primary)]/10"
                    : "border-[var(--foreground)]/10 bg-[var(--background-secondary)] hover:border-[var(--foreground)]/20"
                }`}
              >
                <div className="text-xl font-bold text-[var(--foreground)]">
                  {c.symbol}
                </div>
                <div className="text-xs text-[var(--foreground)]/60">
                  {c.code}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
