"use client";

import { motion } from "framer-motion";

type ChartType = "bar" | "circle" | "trend";

interface MetricCardProps {
  title: string;
  value: string;
  chartType: ChartType;
  color?: "primary" | "success" | "warning";
}

function BarChart({ color }: { color: string }) {
  const bars = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="flex items-end justify-between gap-1 h-16">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t"
          style={{
            backgroundColor: `var(--${color})`,
            opacity: 0.3 + (height / 100) * 0.7
          }}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function CircleChart({ color }: { color: string }) {
  const percentage = 78;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center h-16">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-[var(--foreground)]/10"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={`var(--${color})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function TrendChart({ color }: { color: string }) {
  const points = "0,40 15,35 30,45 45,25 60,30 75,15 90,20 100,5";

  return (
    <div className="h-16 relative">
      <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
        <motion.polyline
          fill="none"
          stroke={`var(--${color})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.polygon
          fill={`var(--${color})`}
          fillOpacity="0.1"
          points={`0,50 ${points} 100,50`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </svg>
    </div>
  );
}

export function MetricCard({ title, value, chartType, color = "primary" }: MetricCardProps) {
  const colorVar = color === "success" ? "accent-success" : color === "warning" ? "accent-warning" : "primary";

  return (
    <motion.div
      className="bg-[var(--background-secondary)] rounded-xl p-5"
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 173, 181, 0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-3">
        {chartType === "bar" && <BarChart color={colorVar} />}
        {chartType === "circle" && <CircleChart color={colorVar} />}
        {chartType === "trend" && <TrendChart color={colorVar} />}
      </div>
      <div className="text-2xl font-bold text-[var(--foreground)]">{value}</div>
      <div className="text-sm text-[var(--foreground)]/60">{title}</div>
    </motion.div>
  );
}
