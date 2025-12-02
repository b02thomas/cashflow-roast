"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
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
    <span ref={ref} className="flex items-baseline justify-center gap-1">
      <motion.span className="text-3xl font-bold text-[var(--foreground)]">
        {rounded}
      </motion.span>
      <span className="text-xl font-bold text-[var(--primary)]">{suffix}</span>
    </span>
  );
}

type TextStat = {
  icon: ReactNode;
  value: string;
  label: string;
  description: string;
  isText: true;
};

type NumericStat = {
  icon: ReactNode;
  value: number;
  label: string;
  description: string;
  isText: false;
};

type Stat = TextStat | NumericStat;

export function StatsRow() {
  const stats: Stat[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      value: "AI",
      label: "Powered",
      description: "Smart Analysis",
      isText: true,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: "Up to",
      label: "23%",
      description: "Hidden Revenue Found",
      isText: true,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      value: "2",
      label: "min",
      description: "To Find Your First Leak",
      isText: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 173, 181, 0.15)" }}
              className="bg-[var(--background-secondary)] rounded-xl p-6 text-center cursor-default"
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              {stat.isText ? (
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-[var(--foreground)]">{stat.value}</span>
                  <span className="text-xl font-bold text-[var(--primary)]">{stat.label}</span>
                </div>
              ) : (
                <div className="mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.label} />
                </div>
              )}
              <p className="text-sm text-[var(--foreground)]/60">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
