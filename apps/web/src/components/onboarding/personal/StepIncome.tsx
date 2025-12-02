"use client";

import { motion } from "framer-motion";

type Props = {
  monthlySalary: number;
  currency: string;
  onSalaryChange: (salary: number) => void;
};

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "\u20AC",
  GBP: "\u00A3",
  CAD: "C$",
  AUD: "A$",
};

export function StepIncome({ monthlySalary, currency, onSalaryChange }: Props) {
  const symbol = currencySymbols[currency] || "$";

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What&apos;s coming in?
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          We&apos;ll use this to calculate your savings rate.
        </motion.p>
      </div>

      <motion.div
        className="max-w-md mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
            Monthly Income (after tax)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 text-xl">
              {symbol}
            </span>
            <input
              type="number"
              value={monthlySalary || ""}
              onChange={(e) => onSalaryChange(parseFloat(e.target.value) || 0)}
              placeholder="5,000"
              className="w-full pl-10 pr-20 py-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] text-xl font-semibold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50">
              /month
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--foreground)]/50">
            Include salary, side hustles, and any regular income.
          </p>
        </div>

        {monthlySalary > 0 && (
          <motion.div
            className="p-4 rounded-lg bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 rounded bg-[var(--accent-success)]/20">
                <svg
                  className="w-5 h-5 text-[var(--accent-success)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[var(--foreground)]">
                  {symbol}
                  {(monthlySalary * 12).toLocaleString()} per year
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
