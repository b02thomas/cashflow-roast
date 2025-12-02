"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  TrendingUp,
  Users,
  FileText,
  PiggyBank,
  RefreshCw,
  Flame,
  Target,
  BarChart3,
  LineChart,
} from "lucide-react";

export function RolesBadges() {
  const [mode, setMode] = useState<"business" | "personal">("business");

  const businessFeatures = [
    { icon: Droplets, title: "Revenue Leak Detection", desc: "Find money you're leaving on the table", color: "text-[var(--accent-warning)]" },
    { icon: TrendingUp, title: "Rate Analysis", desc: "See if you're undercharging", color: "text-[var(--accent-success)]" },
    { icon: Users, title: "Client Insights", desc: "Understand your best customers", color: "text-[var(--primary)]" },
    { icon: FileText, title: "Invoice Tools", desc: "Professional invoicing built-in", color: "text-[var(--foreground)]/70" },
    { icon: PiggyBank, title: "Investment Guidance", desc: "Know when and how much to invest safely", color: "text-[var(--accent-success)]" },
  ];

  const personalFeatures = [
    { icon: RefreshCw, title: "Subscription Tracking", desc: "Never forget a recurring charge", color: "text-[var(--primary)]" },
    { icon: Flame, title: "Expense Roasting", desc: "Get roasted on bad spending", color: "text-[var(--accent-warning)]" },
    { icon: Target, title: "Budget Goals", desc: "Set and track savings targets", color: "text-[var(--accent-success)]" },
    { icon: BarChart3, title: "Spending Patterns", desc: "See where your money goes", color: "text-[var(--primary)]" },
    { icon: LineChart, title: "Investment Strategies", desc: "Guided investing based on your cashflow", color: "text-[var(--accent-success)]" },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)]/30">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
          Built for Anyone Who Wants to Stop Wasting Money
        </h2>
        <p className="text-lg text-[var(--foreground)]/70 mb-10">
          Whether you&apos;re running a business or managing personal finances.
        </p>

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Business Card */}
          <motion.div
            className={`relative rounded-2xl p-6 transition-all cursor-pointer ${
              mode === "business"
                ? "bg-[var(--background-secondary)] ring-2 ring-[var(--primary)]"
                : "bg-[var(--background-secondary)]/50 hover:bg-[var(--background-secondary)]"
            }`}
            onClick={() => setMode("business")}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 173, 181, 0.15)" }}
            transition={{ duration: 0.2 }}
          >
            {mode === "business" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--primary)] rounded-full text-xs font-semibold text-[var(--background)]">
                Selected
              </div>
            )}
            <div className="text-lg font-bold text-[var(--foreground)] mb-4">For Business</div>
            <div className="space-y-3">
              {businessFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 text-left">
                  <feature.icon className={`w-5 h-5 mt-0.5 ${feature.color}`} />
                  <div>
                    <div className="text-sm font-medium text-[var(--foreground)]">{feature.title}</div>
                    <div className="text-xs text-[var(--foreground)]/50">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personal Card */}
          <motion.div
            className={`relative rounded-2xl p-6 transition-all cursor-pointer ${
              mode === "personal"
                ? "bg-[var(--background-secondary)] ring-2 ring-[var(--primary)]"
                : "bg-[var(--background-secondary)]/50 hover:bg-[var(--background-secondary)]"
            }`}
            onClick={() => setMode("personal")}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 173, 181, 0.15)" }}
            transition={{ duration: 0.2 }}
          >
            {mode === "personal" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--primary)] rounded-full text-xs font-semibold text-[var(--background)]">
                Selected
              </div>
            )}
            <div className="text-lg font-bold text-[var(--foreground)] mb-4">For Personal</div>
            <div className="space-y-3">
              {personalFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 text-left">
                  <feature.icon className={`w-5 h-5 mt-0.5 ${feature.color}`} />
                  <div>
                    <div className="text-sm font-medium text-[var(--foreground)]">{feature.title}</div>
                    <div className="text-xs text-[var(--foreground)]/50">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom features */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <span className="flex items-center gap-2 text-[var(--foreground)]/60 text-sm">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            AI-Powered Analysis
          </span>
          <span className="flex items-center gap-2 text-[var(--foreground)]/60 text-sm">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Bank Sync Coming Soon
          </span>
          <span className="flex items-center gap-2 text-[var(--foreground)]/60 text-sm">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free for Early Adopters
          </span>
        </div>
      </div>
    </section>
  );
}
