"use client";

import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section
      id={id}
      className="section-shell mx-auto max-w-6xl border-t editorial-rule px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <span className="section-orb section-orb-cyan" aria-hidden="true" />
      <span className="section-orb section-orb-violet" aria-hidden="true" />
      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="mb-9 grid gap-3 sm:grid-cols-[.65fr_1.35fr] sm:items-end sm:gap-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[.25em] accent-text"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
