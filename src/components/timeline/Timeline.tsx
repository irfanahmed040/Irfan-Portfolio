"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { timeline } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";

const FOCUS = ["LLMs", "RAG", "Voice AI", "n8n Agentic Workflows"];

export default function Timeline() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const job = timeline[0];

  // cursor-tracking spotlight + tilt
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${mx}px ${my}px, rgba(255,77,77,0.09), transparent 65%)`;
  const borderGlow = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(255,77,77,0.55), transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    ry.set((x / rect.width - 0.5) * 3);
    rx.set(-(y / rect.height - 0.5) * 3);
  };

  const onLeave = () => {
    mx.set(-400);
    my.set(-400);
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="log" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <SectionHeading index="04" label="where the work happens" title="Experience" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        style={{ perspective: 1400 }}
      >
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-panel"
        >
          {/* cursor spotlight */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
          {/* border glow that follows the cursor */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: borderGlow,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="font-mono text-xs tracking-[0.22em] text-coral uppercase">
                {job.period}
              </p>
              <span className="flex items-center gap-2 rounded-full border border-coral/40 bg-coral-soft px-3 py-1 font-mono text-[10px] tracking-widest text-coral uppercase">
                <span className="relative flex size-1.5" aria-hidden>
                  <span
                    className={`absolute inline-flex size-full rounded-full bg-coral ${reduced ? "" : "animate-ping"}`}
                  />
                  <span className="relative inline-flex size-1.5 rounded-full bg-coral" />
                </span>
                current
              </span>
            </div>

            <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              {job.title}
            </h3>
            <p className="mt-2 font-mono text-sm text-muted">{job.org}</p>

            <ul className="mt-8 max-w-3xl space-y-3">
              {job.points.map((pt) => (
                <li
                  key={pt}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-coral">—</span>
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span
                  key={f}
                  className="rounded-md border border-line bg-panel-2 px-3 py-1.5 font-mono text-xs text-muted transition-colors group-hover:border-coral/25"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
