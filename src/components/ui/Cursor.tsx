"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, [data-cursor]";

export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });
  const trailX = useSpring(x, { stiffness: 90, damping: 18, mass: 1 });
  const trailY = useSpring(y, { stiffness: 90, damping: 18, mass: 1 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(INTERACTIVE));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("cursor-none-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* soft trailing glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997] size-10 rounded-full bg-coral/20 blur-md"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* morphing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-coral"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          opacity: pressed ? 0.5 : 1,
          backgroundColor: hovering ? "rgba(255,77,77,0.12)" : "rgba(255,77,77,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      />
      {/* core dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 rounded-full bg-coral"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 2 : 1 }}
      />
    </>
  );
}
