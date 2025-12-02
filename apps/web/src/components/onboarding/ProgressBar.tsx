"use client";

import { motion } from "framer-motion";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressBar({ currentStep, totalSteps }: Props) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-[var(--foreground)]/50">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs text-[var(--foreground)]/50">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-1 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--primary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
