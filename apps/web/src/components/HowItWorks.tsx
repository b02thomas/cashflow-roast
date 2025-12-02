"use client";

import { motion } from "framer-motion";
import { MetricCard } from "./MetricCard";

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            How Your AI Coach Works
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Connect your data. Get roasted. Improve your cashflow.
          </p>
        </motion.div>

        {/* Input -> Output Flow */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-stretch mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Input Side: Data Sources */}
          <motion.div variants={itemVariants}>
            <div className="text-xs text-[var(--foreground)]/50 font-semibold mb-3 uppercase tracking-wider">Connect your data</div>
            <motion.div
              className="bg-[var(--background-secondary)] rounded-xl p-6 h-[calc(100%-28px)]"
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 173, 181, 0.15)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)]">Your Data</div>
                  <div className="text-xs text-[var(--foreground)]/50">Connect any source</div>
                </div>
              </div>

              {/* Data Source Cards */}
              <div className="space-y-3">
                <motion.div
                  className="bg-[var(--background)] rounded-lg p-3 flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded bg-[var(--accent-success)]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--foreground)]">Bank Accounts</div>
                    <div className="text-xs text-[var(--foreground)]/50">Coming soon</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-warning)]"></div>
                </motion.div>

                <motion.div
                  className="bg-[var(--background)] rounded-lg p-3 flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded bg-[var(--primary)]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--foreground)]">Invoices</div>
                    <div className="text-xs text-[var(--foreground)]/50">Upload or create</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-success)]"></div>
                </motion.div>

                <motion.div
                  className="bg-[var(--background)] rounded-lg p-3 flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded bg-[var(--accent-warning)]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--foreground)]">Expenses</div>
                    <div className="text-xs text-[var(--foreground)]/50">Track spending</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-success)]"></div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Output Side: Insights */}
          <motion.div variants={itemVariants}>
            <div className="text-xs text-[var(--accent-success)] font-semibold mb-3 uppercase tracking-wider">You get this growth</div>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-28px)]">
              <MetricCard
                title="Revenue Leaks Found"
                value="$2,400"
                chartType="bar"
                color="warning"
              />
              <MetricCard
                title="Rate Optimization"
                value="+23%"
                chartType="trend"
                color="success"
              />
              <MetricCard
                title="Cashflow Score"
                value="78/100"
                chartType="circle"
                color="primary"
              />
              <motion.div
                className="bg-[var(--background-secondary)] rounded-xl p-5 flex flex-col justify-center"
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 173, 181, 0.15)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-sm text-[var(--foreground)]/70 italic mb-2">
                  &quot;You missed $200 in revision fees. Add a revision clause next time.&quot;
                </div>
                <div className="text-xs text-[var(--primary)] font-medium">AI Roast Insight</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-8 py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve Your Spot
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
