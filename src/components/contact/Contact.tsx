"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/profile";
import Magnetic from "@/components/ui/Magnetic";
import GlitchText from "@/components/ui/GlitchText";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — mailto link still works
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[85svh] flex-col justify-center overflow-hidden px-6 py-16 md:px-10"
    >
      {/* backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-xs tracking-[0.25em] text-coral uppercase"
        >
          {"//"} 05 — open channel
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[1.02] tracking-tight text-ink"
        >
          <GlitchText text="Looking for a" auto />
          <br />
          <span className="text-coral">junior AI engineer?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12"
        >
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${identity.email}`}
              className="inline-block break-all font-mono text-lg text-ink underline decoration-coral/40 decoration-2 underline-offset-8 transition-colors hover:text-coral sm:text-2xl md:text-3xl"
            >
              {identity.email}
            </a>
          </Magnetic>
          <button
            onClick={copyEmail}
            className="ml-5 rounded-full border border-line px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-coral hover:text-coral"
          >
            {copied ? "copied ✓" : "copy"}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-14 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href={identity.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-line px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-coral hover:text-coral"
            >
              github ↗
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={identity.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-line px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-coral hover:text-coral"
            >
              linkedin ↗
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={identity.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-coral px-6 py-3 font-mono text-sm font-semibold text-base transition-colors hover:bg-ink"
            >
              resume.pdf ↓
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* footer */}
      <footer className="relative mx-auto mt-16 w-full max-w-6xl border-t border-line pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-muted">
          <p>
            designed &amp; built by {identity.name} · © {new Date().getFullYear()}
          </p>
          <p>
            {identity.location} · press{" "}
            <kbd className="rounded border border-line px-1.5 py-0.5 text-coral">`</kbd>{" "}
            for terminal
          </p>
        </div>
      </footer>
    </section>
  );
}
