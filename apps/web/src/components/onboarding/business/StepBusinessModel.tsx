"use client";

import { motion, AnimatePresence } from "framer-motion";

type BusinessType = "services" | "products" | "both";

type Props = {
  businessType: BusinessType;
  targetHourlyRate: number;
  onBusinessTypeChange: (type: BusinessType) => void;
  onHourlyRateChange: (rate: number) => void;
};

const businessTypes = [
  {
    id: "services" as const,
    title: "I sell my time",
    description: "Consulting, freelancing, hourly work",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    showsHourlyRate: true,
    hourlyRateRequired: true,
  },
  {
    id: "products" as const,
    title: "I sell products",
    description: "E-commerce, fixed-price items",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    showsHourlyRate: false,
    hourlyRateRequired: false,
  },
  {
    id: "both" as const,
    title: "I do both",
    description: "Mix of services and products",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    showsHourlyRate: true,
    hourlyRateRequired: false,
  },
];

export function StepBusinessModel({
  businessType,
  targetHourlyRate,
  onBusinessTypeChange,
  onHourlyRateChange,
}: Props) {
  const selectedType = businessTypes.find((t) => t.id === businessType);
  const showHourlyRate = selectedType?.showsHourlyRate ?? false;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How do you earn?
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          This helps us calculate your effective hourly rate.
        </motion.p>
      </div>

      <motion.div
        className="grid gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {businessTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onBusinessTypeChange(type.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
              businessType === type.id
                ? "border-[var(--primary)] bg-[var(--primary)]/10"
                : "border-[var(--foreground)]/10 bg-[var(--background-secondary)] hover:border-[var(--foreground)]/20"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                businessType === type.id
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--foreground)]/10 text-[var(--foreground)]"
              }`}
            >
              {type.icon}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">
                {type.title}
              </h3>
              <p className="text-sm text-[var(--foreground)]/60">
                {type.description}
              </p>
            </div>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {showHourlyRate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-[var(--foreground)]/10">
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Target Hourly Rate
                {!selectedType?.hourlyRateRequired && (
                  <span className="text-[var(--foreground)]/40 ml-2">
                    (optional)
                  </span>
                )}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={targetHourlyRate || ""}
                  onChange={(e) =>
                    onHourlyRateChange(parseFloat(e.target.value) || 0)
                  }
                  placeholder="150"
                  className="w-full pl-8 pr-16 py-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50">
                  /hour
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--foreground)]/50">
                We&apos;ll roast you if you&apos;re charging less than this.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
