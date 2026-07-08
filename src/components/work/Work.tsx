"use client";

import { useState } from "react";
import { projects } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import DemoModal, { type Demo } from "./DemoModal";

export default function Work() {
  const [demo, setDemo] = useState<Demo | null>(null);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <SectionHeading title="My Projects" />
      <div className="space-y-10">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onDemo={setDemo} />
        ))}
      </div>
      <DemoModal demo={demo} onClose={() => setDemo(null)} />
    </section>
  );
}
