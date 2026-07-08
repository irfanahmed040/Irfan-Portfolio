"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "@/data/profile";
import type { Demo } from "./DemoModal";

export default function ProjectCard({
  project,
  onDemo,
}: {
  project: Project;
  onDemo: (demo: Demo) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 5);
    rx.set(-py * 5);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-coral/40 md:p-10"
      >
        {/* oversized ghost index */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-10 font-display text-[9rem] font-bold leading-none text-ink/[0.045] transition-colors duration-500 group-hover:text-coral/10 md:text-[13rem]"
        >
          {project.index}
        </span>

        <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-coral uppercase">
              {project.context}
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-sm text-muted">
              {project.tagline}
            </p>

            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed">
              <p className="text-muted">
                <span className="font-mono text-[11px] tracking-[0.2em] text-coral/80 uppercase">
                  problem&nbsp;&nbsp;
                </span>
                {project.problem}
              </p>
              <p className="text-ink/85">
                <span className="font-mono text-[11px] tracking-[0.2em] text-coral/80 uppercase">
                  built&nbsp;&nbsp;
                </span>
                {project.built}
              </p>
              <p className="text-ink">
                <span className="font-mono text-[11px] tracking-[0.2em] text-coral uppercase">
                  impact&nbsp;&nbsp;
                </span>
                {project.impact}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-panel-2 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-coral/25"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {project.links.map((link) =>
                link.kind === "video" || link.kind === "audio" ? (
                  <button
                    key={link.href}
                    onClick={() =>
                      onDemo({
                        title: project.title,
                        src: link.href,
                        kind: link.kind as "video" | "audio",
                      })
                    }
                    className="rounded-full border border-coral/50 px-5 py-2 font-mono text-xs text-coral transition-colors hover:bg-coral hover:text-base"
                  >
                    ▶ {link.label}
                  </button>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-5 py-2 font-mono text-xs text-ink transition-colors hover:border-coral hover:text-coral"
                  >
                    {link.label} ↗
                  </a>
                )
              )}
              {project.confidential && (
                <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] text-muted">
                  <span className="text-coral">🔒</span> source confidential —
                  internship IP
                </span>
              )}
            </div>
          </div>

          {/* preview panel — slides in on hover, static on touch */}
          <div className="relative hidden md:block">
            <motion.div
              animate={
                reduced
                  ? { opacity: 1 }
                  : {
                      opacity: hovered ? 1 : 0.35,
                      scale: hovered ? 1 : 0.96,
                      y: hovered ? 0 : 10,
                    }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-24 overflow-hidden rounded-xl border border-line"
              style={{ transform: "translateZ(30px)" }}
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                width={640}
                height={400}
                className="h-56 w-full bg-panel-2 object-contain"
              />
              <div className="border-t border-line bg-panel-2 px-4 py-2.5">
                <ul className="space-y-1">
                  {project.highlights.slice(0, 2).map((h) => (
                    <li
                      key={h}
                      className="truncate font-mono text-[10.5px] text-muted"
                    >
                      <span className="text-coral">▸</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* mobile highlights */}
        <ul className="mt-6 space-y-1.5 md:hidden">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="font-mono text-[11px] leading-snug text-muted">
              <span className="text-coral">▸</span> {h}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
}
