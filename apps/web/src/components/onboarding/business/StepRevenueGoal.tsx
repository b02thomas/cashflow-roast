"use client";

import { motion } from "framer-motion";

type Props = {
  monthlyRevenueGoal: number;
  currency: string;
  onGoalChange: (goal: number) => void;
};

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "\u20AC",
  GBP: "\u00A3",
  CAD: "C$",
  AUD: "A$",
};

export function StepRevenueGoal({
  monthlyRevenueGoal,
  currency,
  onGoalChange,
}: Props) {
  const symbol = currencySymbols[currency] || "$";

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What is your Freedom Number?
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          How much do you want to make per month?
        </motion.p>
      </div>

      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 text-2xl">
            {symbol}
          </span>
          <input
            type="number"
            value={monthlyRevenueGoal || ""}
            onChange={(e) => onGoalChange(parseFloat(e.target.value) || 0)}
            placeholder="10,000"
            className="w-full pl-12 pr-20 py-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] text-2xl font-semibold text-center"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50">
            /month
          </span>
        </div>

        <motion.div
          className="mt-6 p-4 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-1 rounded bg-[var(--primary)]/20">
              <svg
                className="w-5 h-5 text-[var(--primary)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[var(--foreground)]">
                Ambition is good. We&apos;ll help you track this.
              </p>
              {monthlyRevenueGoal > 0 && (
                <p className="text-xs text-[var(--foreground)]/60 mt-1">
                  That&apos;s {symbol}
                  {(monthlyRevenueGoal * 12).toLocaleString()} per year.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
