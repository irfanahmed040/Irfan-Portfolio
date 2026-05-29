import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1rem", lineHeight: "1.8" }}>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi! I'm <span className="purple">Irfan Mohammed Ahmed</span> from{" "}
            <span className="purple">Hyderabad, India</span> — an AI engineer
            who doesn't just study intelligence, but builds it.
            <br />
            <br />
            Currently an <span className="purple">AI Intern at Tericsoft</span>,
            shipping real automation systems in production. Pursuing my B.Tech
            in <span className="purple">Artificial Intelligence</span> at{" "}
            <span className="purple">Vidya Jyothi Institute of Technology</span>{" "}
            (2022–2026).
            <br />
            <br />
            A few things that set me apart:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Designed and deployed end-to-end{" "}
              <span className="purple">Agentic AI workflows</span> using n8n +
              LLMs — automating tasks that used to take hours down to seconds
            </li>
            <li className="about-activity">
              <ImPointRight /> I build at the intersection of hardware and
              software —{" "}
              <span className="purple">Robotic Arms, Racing Simulators</span>,
              and AI-powered physical systems
            </li>
            <li className="about-activity">
              <ImPointRight /> Shipped{" "}
              <span className="purple">production-ready Generative AI</span>{" "}
              integrations, not just side projects — real systems used by real
              people
            </li>
            <li className="about-activity">
              <ImPointRight /> Automation-first mindset: if a task can be
              automated, I'll build the agent that does it better than a human
            </li>
            <li className="about-activity">
              <ImPointRight /> Always exploring the bleeding edge —{" "}
              <span className="purple">
                multi-agent systems, RAG pipelines, and AI tool orchestration
              </span>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "The best engineers don't just write code — they engineer outcomes."
          </p>
          <footer className="blockquote-footer">Irfan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
