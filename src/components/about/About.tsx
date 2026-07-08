"use client";

import { motion } from "framer-motion";
import { about, identity } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import StreamingText from "@/components/ui/StreamingText";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <SectionHeading index="01" label="the human in the loop" title="About" />

      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        {/* terminal-framed streaming bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-xl border border-line bg-panel"
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-coral/80" />
              <span className="size-2.5 rounded-full bg-muted/40" />
              <span className="size-2.5 rounded-full bg-muted/40" />
            </span>
            <p className="font-mono text-xs text-muted">
              irfan@portfolio:~$ cat about.md
            </p>
          </div>
          <div className="p-6 md:p-8">
            <StreamingText
              text={about.stream}
              className="text-[0.98rem] leading-[1.9] text-ink/90"
            />
            <p className="mt-8 border-l-2 border-coral pl-4 font-mono text-sm italic text-muted">
              “{identity.quote}”
            </p>
          </div>
        </motion.div>

        {/* quick facts */}
        <div className="grid content-start gap-4">
          {about.facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-line bg-panel p-5 transition-colors hover:border-coral/40"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-coral uppercase">
                {f.label}
              </p>
              <p className="mt-1.5 font-display text-lg font-medium text-ink">
                {f.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
