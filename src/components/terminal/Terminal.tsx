"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { identity, projects, skills, timeline } from "@/data/profile";

type Line = { text: string; kind: "input" | "output" | "accent" };

const BANNER = [
  "irfan-portfolio v2.0.0 — interactive shell",
  "type `help` to list commands. `esc` or `exit` to close.",
];

function buildResponse(raw: string): { lines: Line[]; action?: () => void } {
  const cmd = raw.trim().toLowerCase();
  const out = (text: string, kind: Line["kind"] = "output"): Line => ({
    text,
    kind,
  });

  switch (cmd) {
    case "help":
      return {
        lines: [
          out("available commands:", "accent"),
          out("  whoami        who is this guy"),
          out("  projects      list shipped work"),
          out("  skills        dump the toolchain"),
          out("  experience    work / research / education log"),
          out("  contact       how to reach me"),
          out("  socials       github + linkedin"),
          out("  resume        open resume.pdf"),
          out("  quote         words to build by"),
          out("  sudo hire-me  do it"),
          out("  clear · exit"),
        ],
      };
    case "whoami":
      return {
        lines: [
          out(`${identity.name} — AI engineer, ${identity.location}`, "accent"),
          out(identity.headline),
          out(identity.subline),
          out(`currently: AI & Automations Intern @ Tericsoft`),
        ],
      };
    case "projects":
      return {
        lines: [
          out(`${projects.length} projects loaded:`, "accent"),
          ...projects.map((p) =>
            out(`  [${p.index}] ${p.title} — ${p.tagline}`)
          ),
          out("scroll to #work for the full breakdown."),
        ],
      };
    case "skills":
      return {
        lines: skills.clusters.map((c) =>
          out(`  ${c.name}: ${c.items.join(", ")}`)
        ),
      };
    case "experience":
      return {
        lines: timeline.map((t) =>
          out(`  [${t.period}] ${t.title} — ${t.org}`)
        ),
      };
    case "contact":
      return {
        lines: [
          out(`email: ${identity.email}`, "accent"),
          out(`location: ${identity.location}`),
          out("channel is open. always."),
        ],
      };
    case "socials":
      return {
        lines: [
          out(`github:   ${identity.socials.github}`),
          out(`linkedin: ${identity.socials.linkedin}`),
        ],
      };
    case "resume":
      return {
        lines: [out("opening resume.pdf …", "accent")],
        action: () => window.open(identity.resume, "_blank"),
      };
    case "quote":
      return { lines: [out(`“${identity.quote}”`, "accent")] };
    case "sudo hire-me":
    case "hire-me":
    case "hire me":
      return {
        lines: [out("permission granted. drafting email …", "accent")],
        action: () =>
          (window.location.href = `mailto:${identity.email}?subject=Let's build something`),
      };
    case "ls":
      return { lines: [out("work/  about/  skills/  log/  contact/")] };
    case "":
      return { lines: [] };
    default:
      return {
        lines: [out(`command not found: ${cmd} — try \`help\``)],
      };
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(
    BANNER.map((text) => ({ text, kind: "output" as const }))
  );
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (cmd === "clear") {
        setLines([]);
        return;
      }
      if (cmd === "exit") {
        setOpen(false);
        return;
      }
      const { lines: res, action } = buildResponse(raw);
      setLines((prev) => [
        ...prev,
        { text: `irfan@portfolio:~$ ${raw}`, kind: "input" },
        ...res,
      ]);
      action?.();
    },
    []
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setHistory((h) => [value, ...h]);
    }
    setHistIdx(-1);
    run(value);
    setValue("");
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) {
        setHistIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "`" && value === "") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-end justify-center bg-base/70 backdrop-blur-sm md:items-center"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="flex h-[70svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-line bg-[#0c0c13] shadow-2xl shadow-coral/5 md:h-[60vh] md:rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-coral/80" />
                  <span className="size-2.5 rounded-full bg-muted/40" />
                  <span className="size-2.5 rounded-full bg-muted/40" />
                </span>
                <p className="font-mono text-xs text-muted">
                  irfan@portfolio — zsh
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-muted transition-colors hover:text-coral"
              >
                esc ✕
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.kind === "input"
                      ? "text-ink"
                      : line.kind === "accent"
                        ? "text-coral"
                        : "whitespace-pre-wrap text-muted"
                  }
                >
                  {line.text}
                </p>
              ))}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-line px-4 py-3"
            >
              <span className="font-mono text-[13px] text-coral">
                irfan@portfolio:~$
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onInputKey}
                className="flex-1 bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-muted/50"
                placeholder="help"
                spellCheck={false}
                autoComplete="off"
                aria-label="terminal input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
