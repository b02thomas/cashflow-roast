"use client";

import { motion } from "framer-motion";

export function TemplateGallery() {
  const templates = [
    {
      name: "Minimalist",
      description: "Clean and professional",
      colors: ["#ffffff", "#f5f5f5", "#333333"],
    },
    {
      name: "Corporate",
      description: "Trust and credibility",
      colors: ["#1a365d", "#2c5282", "#ffffff"],
    },
    {
      name: "Creative",
      description: "Stand out from the crowd",
      colors: ["#9f7aea", "#ed64a6", "#ffffff"],
    },
    {
      name: "Bold",
      description: "Make a statement",
      colors: ["#000000", "#ffd700", "#ffffff"],
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "ZUGFeRD Compatible",
      description: "German e-invoicing standard compliant for seamless business transactions",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI-Powered Analysis",
      description: "Smart insights on every invoice to maximize your revenue potential",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      title: "One-Click PDF Export",
      description: "Professional PDF ready instantly, no formatting hassle",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            Professional Tools, Built In
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Need to send an invoice? We&apos;ve got you covered with AI-powered templates.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {templates.map((template) => (
            <motion.div
              key={template.name}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.2 }
              }}
              className="group bg-[var(--background-secondary)] rounded-xl p-4 cursor-pointer"
            >
              {/* Template Preview */}
              <motion.div
                className="aspect-[3/4] rounded-lg mb-4 overflow-hidden shadow-lg"
                style={{ backgroundColor: template.colors[0] }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-full p-4 flex flex-col">
                  <div className="h-2 w-16 rounded mb-2" style={{ backgroundColor: template.colors[1] }} />
                  <div className="h-1 w-12 rounded mb-4" style={{ backgroundColor: template.colors[2] + "40" }} />
                  <div className="flex-1 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-1 w-20 rounded" style={{ backgroundColor: template.colors[2] + "30" }} />
                        <div className="h-1 w-8 rounded" style={{ backgroundColor: template.colors[2] + "30" }} />
                      </div>
                    ))}
                  </div>
                  <div className="h-2 w-24 rounded mt-4" style={{ backgroundColor: template.colors[1] }} />
                </div>
              </motion.div>

              <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-[var(--foreground)]/60">{template.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[var(--foreground)]/60 text-sm">
            All templates are 100% customizable and professionally designed
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid sm:grid-cols-3 gap-8 mt-16 pt-12 border-t border-[var(--foreground)]/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="text-center"
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-bold text-[var(--foreground)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--foreground)]/60">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
