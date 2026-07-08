"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Text that glitches on hover; with `auto`, also pulses occasionally. */
export default function GlitchText({
  text,
  auto = false,
  className,
}: {
  text: string;
  auto?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!auto || reduced) return;
    const tick = () => {
      setRun(true);
      setTimeout(() => setRun(false), 450);
    };
    const id = setInterval(tick, 5200 + Math.random() * 2600);
    return () => clearInterval(id);
  }, [auto, reduced]);

  return (
    <span
      data-text={text}
      className={`glitch ${run ? "glitch-run" : ""} ${className ?? ""}`}
    >
      {text}
    </span>
  );
}
