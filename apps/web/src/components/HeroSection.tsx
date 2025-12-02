"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { joinWaitlist } from "@/app/actions/waitlist";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });

    const result = await joinWaitlist(email);

    if (result.success) {
      setStatus({ type: "success", message: result.message });
      setEmail("");
    } else {
      setStatus({ type: "error", message: result.message });
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary glow - teal, positioned top-right */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 173, 181, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary glow - success green, positioned bottom-left */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 230, 118, 0.2) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            opacity: [0.1, 0.18, 0.1],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stop Leaving Money
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-[var(--primary)] via-[var(--accent-success)] to-[var(--primary)] bg-[length:200%_auto] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            on the Table.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[var(--foreground)]/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your AI financial coach that finds revenue leaks, optimizes your rates, and roasts your cashflow habits. Professional invoicing included.
        </motion.p>

        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Bank sync coming soon
          </span>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for beta access"
            className="flex-1 px-4 py-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--background-secondary)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:border-[var(--primary)] transition-colors"
            disabled={status.type === "loading"}
          />
          <motion.button
            type="submit"
            disabled={status.type === "loading"}
            className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] font-semibold rounded-lg transition-colors disabled:opacity-50 shadow-[0_0_30px_rgba(0,173,181,0.3)]"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 173, 181, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            {status.type === "loading" ? "Joining..." : "Get Early Access"}
          </motion.button>
        </motion.form>

        {status.type !== "idle" && status.type !== "loading" && (
          <motion.p
            className={`text-sm mb-6 ${status.type === "success" ? "text-[var(--accent-success)]" : "text-[var(--accent-warning)]"}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {status.message}
          </motion.p>
        )}

        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free forever for early adopters
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Setup in 2 minutes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
