"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Demo = {
  title: string;
  src: string;
  kind: "video" | "audio";
};

export default function DemoModal({
  demo,
  onClose,
}: {
  demo: Demo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!demo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [demo, onClose]);

  return (
    <AnimatePresence>
      {demo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-base/90 p-4 backdrop-blur-md md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${demo.title} demo`}
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-full max-w-4xl overflow-hidden rounded-xl border border-line bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* terminal-style title bar */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-coral/80" />
                  <span className="size-2.5 rounded-full bg-muted/40" />
                  <span className="size-2.5 rounded-full bg-muted/40" />
                </span>
                <p className="font-mono text-xs text-muted">
                  demo — {demo.title}
                </p>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-xs text-muted transition-colors hover:text-coral"
              >
                esc / close ✕
              </button>
            </div>
            {demo.kind === "audio" ? (
              <div className="p-5">
                <iframe
                  src={demo.src}
                  title={`${demo.title} demo`}
                  allow="autoplay"
                  className="h-24 w-full border-none"
                />
              </div>
            ) : (
              <div className="relative aspect-video">
                <iframe
                  src={demo.src}
                  title={`${demo.title} demo`}
                  allow="autoplay"
                  allowFullScreen
                  className="absolute inset-0 size-full border-none"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
