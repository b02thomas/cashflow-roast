"use client";

import { motion } from "framer-motion";

export function PricingCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)]/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-[var(--foreground)]/70">
            Start free and upgrade when you&apos;re ready to accelerate your financial growth
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Standard Plan (Blurred/Future) */}
          <motion.div
            variants={cardVariants}
            className="relative bg-[var(--background-secondary)] rounded-xl p-6 opacity-50 blur-[1px]"
          >
            <div className="absolute top-4 right-4 px-2 py-1 bg-[var(--foreground)]/10 rounded text-xs text-[var(--foreground)]/50">
              Coming Soon
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Standard</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-[var(--foreground)]">$15</span>
              <span className="text-[var(--foreground)]/60">/month</span>
            </div>
            <p className="text-[var(--foreground)]/60 mb-6">Full access to all features</p>
            <ul className="space-y-3 mb-6">
              {[
                "Unlimited invoices",
                "AI Business Roast",
                "All templates",
                "PDF export",
                "Client management",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-[var(--foreground)]/60">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button disabled className="w-full py-3 rounded-lg bg-[var(--foreground)]/10 text-[var(--foreground)]/50 font-medium cursor-not-allowed">
              Available at Launch
            </button>
          </motion.div>

          {/* Beta Access (Highlighted) */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 25px 50px rgba(0, 173, 181, 0.3)",
              transition: { duration: 0.3 }
            }}
            className="relative bg-[var(--background-secondary)] rounded-xl p-6 border-2 border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
          >
            <motion.div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[var(--primary)] rounded-full text-xs font-semibold text-[var(--background)]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              Most Popular
            </motion.div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Beta Access</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <motion.span
                className="text-4xl font-bold text-[var(--accent-success)]"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                FREE
              </motion.span>
              <span className="text-[var(--foreground)]/60">/forever</span>
            </div>
            <p className="text-[var(--foreground)]/60 mb-6">Lock in free access as an early adopter</p>
            <ul className="space-y-3 mb-6">
              {[
                "AI Cashflow Coaching",
                "Revenue Leak Detection",
                "Expense Roasting (Personal)",
                "Professional Invoicing",
                "All Premium Templates",
                "Bank Sync (Coming Soon)",
                "Founder Status Badge",
              ].map((feature, index) => (
                <motion.li
                  key={feature}
                  className="flex items-center gap-2 text-[var(--foreground)]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Waitlist & Lock Price
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
