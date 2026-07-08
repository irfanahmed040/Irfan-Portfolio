"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { identity } from "@/data/profile";
import Magnetic from "@/components/ui/Magnetic";

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
});

type CharSprings = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rot: MotionValue<number>;
};

type Registry = { el: HTMLElement; s: CharSprings }[];

const SCATTER_RADIUS = 140;
const SCATTER_PUSH = 26;

function ScatterChar({
  ch,
  delay,
  outlined,
  clip,
  registry,
}: {
  ch: string;
  delay: number;
  outlined?: boolean;
  clip: boolean;
  registry: React.RefObject<Registry>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 13, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 13, mass: 0.4 });
  const rot = useSpring(useMotionValue(0), { stiffness: 170, damping: 13, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const entry = { el, s: { x, y, rot } };
    registry.current.push(entry);
    return () => {
      registry.current = registry.current.filter((e) => e !== entry);
    };
  }, [registry, x, y, rot]);

  return (
    <span className={`inline-block ${clip ? "overflow-hidden" : ""}`}>
      <motion.span
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        <motion.span
          ref={ref}
          style={{
            x,
            y,
            rotate: rot,
            ...(outlined
              ? { WebkitTextStroke: "1.5px var(--color-coral)", color: "transparent" }
              : {}),
          }}
          className="inline-block"
        >
          {ch === " " ? " " : ch}
        </motion.span>
      </motion.span>
    </span>
  );
}

function RevealLine({
  text,
  delay,
  outlined,
  clip,
  registry,
}: {
  text: string;
  delay: number;
  outlined?: boolean;
  clip: boolean;
  registry: React.RefObject<Registry>;
}) {
  return (
    <span className="flex flex-wrap">
      {text.split("").map((ch, i) => (
        <ScatterChar
          key={i}
          ch={ch}
          delay={delay + i * 0.035}
          outlined={outlined}
          clip={clip}
          registry={registry}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const registry = useRef<Registry>([]);

  // cursor parallax for the copy block
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });

  useEffect(() => {
    if (reduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    setParticleCount(coarse || small ? 450 : 1400);
    const t = setTimeout(() => setEntered(true), 2000);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced) setEntered(true);
  }, [reduced]);

  // one listener drives letter scatter + copy parallax
  useEffect(() => {
    if (reduced || !entered) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        for (const { el, s } of registry.current) {
          const rect = el.getBoundingClientRect();
          const dx = rect.left + rect.width / 2 - e.clientX;
          const dy = rect.top + rect.height / 2 - e.clientY;
          const d = Math.hypot(dx, dy);
          if (d < SCATTER_RADIUS && d > 0.01) {
            const f = (1 - d / SCATTER_RADIUS) * SCATTER_PUSH;
            s.x.set((dx / d) * f);
            s.y.set((dy / d) * f);
            s.rot.set((dx / d) * (1 - d / SCATTER_RADIUS) * 7);
          } else {
            s.x.set(0);
            s.y.set(0);
            s.rot.set(0);
          }
        }
        px.set((e.clientX / window.innerWidth - 0.5) * -14);
        py.set((e.clientY / window.innerHeight - 0.5) * -10);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, entered, px, py]);

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-base"
    >
      {/* particle field backdrop */}
      {particleCount !== null && (
        <div className="absolute inset-0" aria-hidden>
          <ParticleField count={particleCount} />
        </div>
      )}
      {/* bottom fade into page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base"
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-20 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 font-mono text-xs tracking-[0.3em] text-muted uppercase"
        >
          <span className="text-coral">●</span> {identity.location} — open to
          the hard problems
        </motion.p>

        <h1 className="font-display text-[clamp(2.75rem,10vw,7.75rem)] font-bold leading-[0.95] tracking-tight text-ink">
          <RevealLine text="IRFAN" delay={0.35} clip={!entered} registry={registry} />
          <RevealLine text="MOHAMMED" delay={0.55} outlined clip={!entered} registry={registry} />
          <RevealLine text="AHMED" delay={0.8} clip={!entered} registry={registry} />
        </h1>

        <motion.div style={{ x: px, y: py }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            className="mt-6 max-w-xl"
          >
            <p className="font-display text-2xl font-medium text-ink md:text-3xl">
              {identity.headline}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
              {identity.subline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-mono text-sm font-semibold tracking-wide text-base transition-colors hover:bg-ink"
              >
                view my projects ↓
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={identity.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono text-sm tracking-wide text-ink transition-colors hover:border-coral hover:text-coral"
              >
                resume ↗
              </a>
            </Magnetic>
            <span className="hidden font-mono text-xs text-muted md:inline">
              press <kbd className="rounded border border-line px-1.5 py-0.5 text-coral">`</kbd> for terminal
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* roles ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 border-t border-line bg-base/60 py-3 backdrop-blur-sm"
        aria-hidden
      >
        <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-xs tracking-[0.2em] text-muted uppercase">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex">
              {identity.roles.map((r) => (
                <span key={r} className="mx-6 flex items-center gap-6">
                  {r} <span className="text-coral">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
