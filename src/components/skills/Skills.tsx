"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills, identity } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";

type Node = {
  x: number;
  y: number;
  label: string;
  cluster: string;
  anchor: "start" | "middle" | "end";
  tx: number;
  ty: number;
};

type Hub = {
  x: number;
  y: number;
  name: string;
  anchor: "start" | "middle" | "end";
  lx: number;
  ly: number;
};

const CX = 500;
const CY = 400;

// Round to 2 decimals: Math.cos/sin can differ in the last float bit between
// the Node SSR runtime and the browser, causing hydration mismatches on SVG attrs.
const r2 = (v: number) => Math.round(v * 100) / 100;

function layout() {
  const hubs: Hub[] = [];
  const nodes: Node[] = [];
  const rx = 280;
  const ry = 195;

  skills.clusters.forEach((cluster, i) => {
    const theta = -Math.PI / 2 + (i * 2 * Math.PI) / skills.clusters.length;
    const hx = r2(CX + rx * Math.cos(theta));
    const hy = r2(CY + ry * Math.sin(theta));
    const dirx = Math.cos(theta);
    const diry = Math.sin(theta);

    // label sits on the inward side of the hub — items fan outward
    hubs.push({
      x: hx,
      y: hy,
      name: cluster.name,
      anchor: Math.abs(dirx) < 0.35 ? "middle" : dirx > 0 ? "end" : "start",
      lx: r2(hx + (Math.abs(dirx) < 0.35 ? 0 : dirx > 0 ? -16 : 16)),
      ly: r2(hy + (Math.abs(dirx) < 0.35 ? (diry < 0 ? 30 : -24) : 4)),
    });

    const ring1 = cluster.items.slice(0, 6);
    const ring2 = cluster.items.slice(6);
    const place = (items: string[], radius: number, spread: number) => {
      items.forEach((item, k) => {
        const phi =
          items.length === 1
            ? theta
            : theta - spread / 2 + (spread * k) / (items.length - 1);
        const x = r2(hx + radius * Math.cos(phi));
        const y = r2(hy + radius * Math.sin(phi));
        const ddx = Math.cos(phi);
        const anchor: Node["anchor"] =
          Math.abs(ddx) < 0.3 ? "middle" : ddx > 0 ? "start" : "end";
        nodes.push({
          x,
          y,
          label: item,
          cluster: cluster.name,
          anchor,
          tx: r2(x + (anchor === "middle" ? 0 : ddx > 0 ? 8 : -8)),
          ty: r2(y + (anchor === "middle" ? (Math.sin(phi) > 0 ? 16 : -10) : 4)),
        });
      });
    };
    place(ring1, 92, Math.PI * 0.82);
    place(ring2, 148, Math.PI * 0.66);
  });

  // collision pass: push apart label baselines that would overlap
  for (let pass = 0; pass < 3; pass++) {
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const A = nodes[a];
        const B = nodes[b];
        if (Math.abs(A.ty - B.ty) < 14 && Math.abs(A.tx - B.tx) < 105) {
          const push = (14 - Math.abs(A.ty - B.ty)) / 2 + 1;
          if (A.ty <= B.ty) {
            A.ty -= push;
            B.ty += push;
          } else {
            A.ty += push;
            B.ty -= push;
          }
        }
      }
    }
  }

  return { hubs, nodes };
}

export default function Skills() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const { hubs, nodes } = useMemo(layout, []);

  const dim = (cluster: string) => active !== null && active !== cluster;

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <SectionHeading index="03" label="the toolchain" title="Skill Graph" />

      {/* ── desktop: constellation ── */}
      <div className="relative hidden md:block">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/[0.04] blur-[100px]"
        />
        <p className="pointer-events-none absolute left-0 top-0 font-mono text-[11px] text-muted">
          hover a cluster to isolate it
        </p>
        <svg
          viewBox="0 0 1000 800"
          className="w-full overflow-visible"
          role="img"
          aria-label="Skill graph: clusters of tools connected to a central node"
          onMouseLeave={() => setActive(null)}
        >
          {/* edges: core → hubs */}
          {hubs.map((hub, i) => (
            <motion.line
              key={`core-${hub.name}`}
              x1={CX}
              y1={CY}
              x2={hub.x}
              y2={hub.y}
              stroke="var(--color-coral)"
              strokeWidth={1}
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.08 }}
              style={{ opacity: dim(hub.name) ? 0.04 : 0.22 }}
              className="transition-opacity duration-300"
            />
          ))}
          {/* edges: hub → items */}
          {nodes.map((node, i) => {
            const hub = hubs.find((h) => h.name === node.cluster)!;
            return (
              <motion.line
                key={`edge-${node.cluster}-${node.label}`}
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
                stroke="#8f8f9f"
                strokeWidth={0.6}
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.015 }}
                style={{ opacity: dim(node.cluster) ? 0.03 : 0.16 }}
                className="transition-opacity duration-300"
              />
            );
          })}

          {/* core */}
          <motion.g
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
          >
            <circle cx={CX} cy={CY} r={30} fill="var(--color-panel-2)" stroke="var(--color-coral)" strokeWidth={1.2} />
            <circle cx={CX} cy={CY} r={38} fill="none" stroke="var(--color-coral)" strokeWidth={0.5} opacity={0.35}>
              {!reduced && (
                <animate attributeName="r" values="34;44;34" dur="3.4s" repeatCount="indefinite" />
              )}
              {!reduced && (
                <animate attributeName="opacity" values="0.35;0.05;0.35" dur="3.4s" repeatCount="indefinite" />
              )}
            </circle>
            <text
              x={CX}
              y={CY + 5}
              textAnchor="middle"
              className="fill-ink font-mono"
              fontSize={15}
              fontWeight={700}
            >
              {identity.initials}
            </text>
          </motion.g>

          {/* hubs — outer g: entrance animation, inner g: hover dim (framer keeps
              animated opacity inline, so dimming must live on a separate element) */}
          {hubs.map((hub, i) => (
            <motion.g
              key={hub.name}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
            >
              <g
                onMouseEnter={() => setActive(hub.name)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: dim(hub.name) ? 0.12 : 1 }}
                data-cursor
              >
                <circle cx={hub.x} cy={hub.y} r={18} fill="transparent" />
                <circle cx={hub.x} cy={hub.y} r={7} fill="var(--color-coral)" />
                <circle cx={hub.x} cy={hub.y} r={11} fill="none" stroke="var(--color-coral)" strokeWidth={0.8} opacity={0.5} />
                <text
                  x={hub.lx}
                  y={hub.ly}
                  textAnchor={hub.anchor}
                  className="fill-coral font-mono uppercase"
                  fontSize={12}
                  letterSpacing={2}
                  fontWeight={600}
                >
                  {hub.name}
                </text>
              </g>
            </motion.g>
          ))}

          {/* item nodes — same entrance/dim split */}
          {nodes.map((node, i) => (
            <motion.g
              key={`${node.cluster}-${node.label}`}
              initial={reduced ? false : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.5 + i * 0.018, duration: 0.4 }}
            >
              <g
                onMouseEnter={() => setActive(node.cluster)}
                className="transition-opacity duration-300"
                style={{ opacity: dim(node.cluster) ? 0.07 : 1 }}
              >
                <motion.g
                  animate={reduced ? undefined : { y: [0, -3.5, 0] }}
                  transition={{
                    duration: 3 + (i % 5) * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.4,
                  }}
                >
                  <circle cx={node.x} cy={node.y} r={3.2} className="fill-ink" opacity={0.85} />
                  <text
                    x={node.tx}
                    y={node.ty}
                    textAnchor={node.anchor}
                    className="fill-muted font-mono"
                    fontSize={11}
                  >
                    {node.label}
                  </text>
                </motion.g>
              </g>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* ── mobile: chip grid ── */}
      <div className="md:hidden">
        <div className="space-y-8">
          {skills.clusters.map((cluster) => (
            <div key={cluster.name}>
              <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-coral uppercase">
                <span aria-hidden>◉ </span>
                {cluster.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {cluster.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line bg-panel px-3.5 py-2 font-mono text-[13px] text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
