"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * LLM-style token streaming: reveals text in random-sized word chunks with
 * jittered delays once scrolled into view. Blinking block caret while "generating".
 */
export default function StreamingText({
  text,
  className,
  speed = 42,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = useRef(text.split(" "));
  const [count, setCount] = useState(0);
  const done = count >= words.current.length;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(words.current.length);
      return;
    }
    let cancelled = false;
    let current = 0;

    const step = () => {
      if (cancelled || current >= words.current.length) return;
      // stream 1-3 "tokens" at a time, occasional longer pause like a model thinking
      current = Math.min(
        current + 1 + Math.floor(Math.random() * 3),
        words.current.length
      );
      setCount(current);
      const pause = Math.random() < 0.06 ? 320 : speed + Math.random() * 55;
      setTimeout(step, pause);
    };
    step();
    return () => {
      cancelled = true;
    };
  }, [inView, reduced, speed]);

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{words.current.slice(0, count).join(" ")}</span>
      {!done && inView && (
        <span
          aria-hidden
          className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-blink bg-coral"
        />
      )}
    </p>
  );
}
