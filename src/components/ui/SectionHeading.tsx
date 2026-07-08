"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index?: string;
  label?: string;
  title: string;
}) {
  return (
    <div className="mb-10 md:mb-12">
      {index && label && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-xs tracking-[0.25em] text-coral uppercase"
        >
          {"//"} {index} — {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        <GlitchText text={title} />
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="stream-divider mt-8 origin-left"
      />
    </div>
  );
}
