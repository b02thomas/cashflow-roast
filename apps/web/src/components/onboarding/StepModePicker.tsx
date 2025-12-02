"use client";

import { motion } from "framer-motion";

type AppMode = "business" | "personal" | "both";

type Props = {
  value: AppMode;
  onChange: (mode: AppMode) => void;
};

const modes = [
  {
    id: "business" as const,
    title: "Business",
    subtitle: "I run a business",
    description: "Invoicing, revenue tracking, hourly rate roasts",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "personal" as const,
    title: "Personal",
    subtitle: "I want to save more",
    description: "Income tracking, savings goals, subscription roasts",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "both" as const,
    title: "Both",
    subtitle: "I do both",
    description: "Full experience + Pay Yourself bridge",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
];

export function StepModePicker({ value, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What are you tracking?
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          This determines your dashboard and roasts.
        </motion.p>
      </div>

      <div className="grid gap-4">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`relative p-6 rounded-xl border-2 text-left transition-all ${
              value === mode.id
                ? "border-[var(--primary)] bg-[var(--primary)]/10"
                : "border-[var(--foreground)]/10 bg-[var(--background-secondary)] hover:border-[var(--foreground)]/20"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${
                  value === mode.id
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--foreground)]/10 text-[var(--foreground)]"
                }`}
              >
                {mode.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {mode.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/70 mb-1">
                  {mode.subtitle}
                </p>
                <p className="text-xs text-[var(--foreground)]/50">
                  {mode.description}
                </p>
              </div>
              {value === mode.id && (
                <motion.div
                  className="absolute top-4 right-4 w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
