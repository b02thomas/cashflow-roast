"use client";

import { motion } from "framer-motion";

type Props = {
  monthlySavingsGoal: number;
  monthlySalary: number;
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

export function StepSavingsGoal({
  monthlySavingsGoal,
  monthlySalary,
  currency,
  onGoalChange,
}: Props) {
  const symbol = currencySymbols[currency] || "$";
  const savingsRate =
    monthlySalary > 0 ? (monthlySavingsGoal / monthlySalary) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What&apos;s your savings goal?
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          How much do you want to save each month?
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
            Monthly Savings Target
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 text-xl">
              {symbol}
            </span>
            <input
              type="number"
              value={monthlySavingsGoal || ""}
              onChange={(e) => onGoalChange(parseFloat(e.target.value) || 0)}
              placeholder="1,000"
              className="w-full pl-10 pr-20 py-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] text-xl font-semibold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50">
              /month
            </span>
          </div>
        </div>

        {monthlySavingsGoal > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Savings Rate */}
            {monthlySalary > 0 && (
              <div className="p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--foreground)]/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[var(--foreground)]/70">
                    Savings Rate
                  </span>
                  <span
                    className={`font-bold ${
                      savingsRate >= 20
                        ? "text-[var(--accent-success)]"
                        : savingsRate >= 10
                        ? "text-[var(--primary)]"
                        : "text-[var(--accent-warning)]"
                    }`}
                  >
                    {savingsRate.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      savingsRate >= 20
                        ? "bg-[var(--accent-success)]"
                        : savingsRate >= 10
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--accent-warning)]"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(savingsRate, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* AI Preview */}
            <div className="p-4 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20">
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
                    Small wins compound. Let&apos;s track every dollar.
                  </p>
                  <p className="text-xs text-[var(--foreground)]/60 mt-1">
                    {symbol}
                    {(monthlySavingsGoal * 12).toLocaleString()} saved per year
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
