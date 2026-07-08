"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { identity } from "@/data/profile";

const LINKS = [
  { href: "#work", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#log", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <header className="fixed inset-x-0 top-0 z-[150]">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-coral"
        aria-hidden
      />
      <nav className="flex items-center justify-between border-b border-line bg-base/70 px-6 py-4 backdrop-blur-md md:px-10">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-ink"
        >
          {identity.initials}
          <span className="text-coral">.</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-[0.15em] text-muted transition-colors hover:text-coral"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${identity.email}`}
          className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-ink transition-colors hover:border-coral hover:text-coral md:hidden"
        >
          contact
        </a>
      </nav>
    </header>
  );
}
