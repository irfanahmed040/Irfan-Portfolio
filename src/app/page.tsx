import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Work from "@/components/work/Work";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Timeline from "@/components/timeline/Timeline";
import Contact from "@/components/contact/Contact";
import Terminal from "@/components/terminal/Terminal";
import Cursor from "@/components/ui/Cursor";

export default function Page() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Terminal />
    </>
  );
}
