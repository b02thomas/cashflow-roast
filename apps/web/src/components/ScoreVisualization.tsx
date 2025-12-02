"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedScore({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, value, count]);

  return (
    <motion.span ref={ref} className="text-6xl font-bold text-[var(--accent-warning)]">
      {rounded}
    </motion.span>
  );
}

export function ScoreVisualization() {
  const categories = [
    { name: "Revenue Optimization", score: 18, max: 25, status: "warning" },
    { name: "Expense Control", score: 20, max: 25, status: "good" },
    { name: "Cash Buffer", score: 15, max: 25, status: "warning" },
    { name: "Growth Potential", score: 9, max: 25, status: "bad" },
  ];

  const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);

  return (
    <section id="score-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)]/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            See What&apos;s Costing You Money
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Your AI coach analyzes your finances, highlighting opportunities and warning you about revenue leaks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* AI Coach Chat UI */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="bg-[var(--background-secondary)] rounded-xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Chat Header */}
              <div className="bg-[var(--primary)]/10 px-4 py-3 border-b border-[var(--foreground)]/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)] text-sm">Cashflow Coach</div>
                  <div className="text-xs text-[var(--accent-success)]">Online</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[280px]">
                {/* User Message */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-[var(--primary)] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] text-sm">
                    Why is my cashflow score so low?
                  </div>
                </motion.div>

                {/* AI Message */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-[var(--background)] px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm text-[var(--foreground)]">
                    <p className="mb-2">I found <span className="text-[var(--accent-warning)] font-semibold">3 revenue leaks</span>:</p>
                    <ul className="space-y-1 text-[var(--foreground)]/80">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent-warning)]">•</span>
                        You&apos;re undercharging by 23%
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent-warning)]">•</span>
                        $400 in unbilled revisions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent-warning)]">•</span>
                        Late invoicing costs you $200/mo
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* User Message 2 */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="bg-[var(--primary)] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] text-sm">
                    How do I fix this?
                  </div>
                </motion.div>

                {/* AI Typing Indicator */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="bg-[var(--background)] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Score Card */}
          <motion.div
            className="bg-[var(--background-secondary)] rounded-xl p-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="text-center mb-6">
              <AnimatedScore value={totalScore} />
              <div className="text-xl text-[var(--foreground)]/70">/100</div>
              <motion.div
                className="text-lg font-medium text-[var(--accent-warning)] mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                Needs Improvement
              </motion.div>
            </div>

            <div className="space-y-4">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--foreground)]/70">{cat.name}</span>
                    <span className={
                      cat.status === "good" ? "text-[var(--accent-success)]" :
                      cat.status === "warning" ? "text-[var(--accent-warning)]" :
                      "text-red-500"
                    }>
                      {cat.score}/{cat.max}
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        cat.status === "good" ? "bg-[var(--accent-success)]" :
                        cat.status === "warning" ? "bg-[var(--accent-warning)]" :
                        "bg-red-500"
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(cat.score / cat.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
