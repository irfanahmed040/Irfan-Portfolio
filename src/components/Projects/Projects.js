import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import doctorImg from "../../Assets/Projects/doctor.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import robotImg from "../../Assets/Projects/robot.png";
// import seoAgent from "../../Assets/Projects/seo-agent.png"; // uncomment once image is saved

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "rgb(180,180,180)", fontFamily: "'Raleway', sans-serif", marginBottom: "40px" }}>
          A selection of projects spanning AI automation, deep learning, hardware engineering, and data analytics.
        </p>

        <Row>
          {/* ── SEO Blog Agent ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={bitsOfCode}
              title="SEO Blog Agent"
              tags={["n8n", "Agentic AI", "LLM", "Automation", "Internship"]}
              description="Built during my internship at Tericsoft, where it was actively used to research, write, and publish SEO blogs on tericsoft.com. Most SEO content pipelines are either fully manual or produce generic AI output — this sits in between. A fully automated n8n workflow that researches, plans, writes, and publishes a blog post while keeping a human in control at the decisions that actually matter. Feed it a keyword and walk away; come back to a structured, research-backed draft ready to review and go live."
              features={[
                "Built in production at Tericsoft — not a side project, actively used to publish content on tericsoft.com",
                "Chat-based input — collects keyword, audience, search intent, and location through natural conversation",
                "Live SERP + competitor analysis via DataForSEO — scrapes and summarises the top-ranking pages before writing a single word",
                "Multi-stage keyword research across 100+ candidates — difficulty scoring, intent classification, and 3-month trend analysis",
                "Multi-model pipeline — LLaMA 3.1 8B for extraction, GPT-4.1 mini for filtering, GPT-4.1 for strategy and final writing",
                "Human review at two checkpoints — approve or edit the content plan before the blog is written, then again before it goes live",
              ]}
              techStack={["n8n", "GPT-4.1", "GPT-4.1 mini", "LLaMA 3.1 8B", "Groq", "DataForSEO", "Google Sheets", "GitHub Gists", "Notion", "JavaScript"]}
              ghLink="https://github.com/irfanahmed040/n8n-Blog-Writing-Workflow"
              demoLink="https://fanatical-fog-322.notion.site/SEO-Automation-2f611c48ddd7807393a1d2d872b47264?pvs=74"
              demoLabel="Notion Docs"
            />
          </Col>

          {/* ── Engineering Manager Bot ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={editor}
              imgHeight="320px"
              title="Engineering Manager Bot"
              tags={["Agentic AI", "RAG", "BigQuery", "Multi-LLM", "Internship Project"]}
              description="Built during my internship at Tericsoft, this is a production-grade engineering intelligence platform that gives managers natural language access to their entire team's performance data — across GitHub, Jira, Keka HR, WhatsApp, and Microsoft Teams — all queried live from 35 BigQuery tables. The system orchestrates four specialised AI models, each chosen for what it does best: LightRAG + Llama 4 Scout for knowledge graph retrieval, Gemini 2.5 Flash for SQL generation and auto-repair, and Mistral Large for visualization planning. Ask it 'who had the most commits last week?' and it retrieves schema context, writes validated SQL, executes it against live BigQuery data, returns a natural language answer, and generates charts — all in a single conversational turn."
              features={[
                "Two modes in one app — a static 11-chart analytics dashboard (productivity scores, code churn treemaps, department radar charts, risk register) and a freeform NL→SQL conversational chat interface",
                "4-model AI orchestration — LightRAG (schema retrieval) → Gemini 2.5 Flash (SQL generation) → BigQuery (execution) → Mistral Large (chart planning) — each model doing only what it's best at",
                "NL→SQL with auto-repair loop — SQL is dry-run validated against BigQuery before execution; if it fails, Gemini auto-repairs it and retries up to 5 times before gracefully giving up",
                "Knowledge graph RAG over 35 BigQuery tables — retrieves only the relevant schema chunks per question, keeping prompts lean and SQL accurate without flooding context with the full schema",
                "Conversational memory across 3 turns — resolves pronouns, carries over date filters, and extends previous queries so follow-up questions work naturally without re-specifying context",
                "Schema-only visualization pipeline — Mistral sees column names and types, never raw rows; it returns aggregation specs that Python executes before Plotly renders — eliminates axis hallucination entirely",
                "Custom LoopAgnosticLock — engineered a fix for a fundamental asyncio conflict where LightRAG's module-level locks were binding to the wrong Streamlit event loop, causing silent RuntimeErrors across pages",
              ]}
              techStack={["Python", "Streamlit", "LightRAG", "Llama 4 Scout", "Gemini 2.5 Flash", "Mistral Large", "Groq", "Google BigQuery", "SentenceTransformers", "Plotly", "asyncio"]}
              confidential={true}
            />
          </Col>

          {/* ── Voice Appointment Booking Agent ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={doctorImg}
              title="AI Voice Appointment Booking Agent"
              tags={["Voice AI", "ElevenLabs", "Make.com", "Automation", "Cal.com"]}
              description="A fully conversational voice agent that handles end-to-end doctor appointment booking — no forms, no hold music, no manual scheduling. Patients speak naturally to the agent, which checks real-time slot availability, collects their details through guided dialogue, reads everything back for confirmation, and books the appointment — all without any human on the clinic's side. Built with a custom patient-facing frontend for a doctor's clinic, the entire pipeline runs on two Make.com automation scenarios wired together through ElevenLabs tool calls and Cal.com's scheduling API."
              features={[
                "Conversational voice interface via ElevenLabs — patients describe when they'd like an appointment in natural speech, no typing or form-filling required",
                "Real-time slot checking via a check_availability tool — the agent calls Make.com's first scenario through a webhook, which queries Cal.com and returns the nearest available time slot",
                "Guided patient detail collection — after slot confirmation, the agent conversationally collects full name, email address, and phone number through natural dialogue",
                "Confirmation loop before booking — agent reads all collected details back to the patient and waits for explicit verbal approval before making any booking",
                "book_appointment tool call triggers Make.com's second scenario — creates the confirmed appointment in Cal.com and returns booking confirmation details back to the patient in real time",
                "Two independent Make.com scenarios — one dedicated to availability checking, one to booking — each triggered by separate ElevenLabs tool calls, keeping the automation clean and modular",
                "Custom clinic frontend — a patient-facing web interface designed specifically for the doctor's clinic, giving it a professional branded experience",
              ]}
              techStack={["ElevenLabs", "Make.com", "Cal.com", "Webhooks", "HTML/CSS/JS"]}
              demoVideo="https://drive.google.com/file/d/1QDX9KHOsEtiCych9ODAjbhwHGFU9NuCn/preview"
            />
          </Col>

          {/* ── Thyroid Cancer Detection ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={leaf}
              title="Thyroid Cancer Detection"
              tags={["Deep Learning", "Computer Vision", "Research"]}
              description="A deep learning model using a Bilinear CNN (dual VGG16 architecture) for classifying thyroid nodules in ultrasound images based on the TIRADS scoring system. Research paper accepted and published in the Proceedings of ICICC-2025 by Springer."
              features={[
                "Bilinear CNN with dual VGG16 backbone — captures fine-grained texture features critical for nodule classification",
                "TIRADS-based classification — aligns model output with clinically established diagnostic standards",
                "XML-based ROI extraction and dataset augmentation for improved generalization on limited medical data",
                "Published in ICICC-2025, Springer — peer-reviewed and internationally recognized",
              ]}
              techStack={["Python", "TensorFlow", "VGG16", "OpenCV", "NumPy", "XML Parsing"]}
              ghLink="#"
            />
          </Col>

          {/* ── Robotic Arm ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={robotImg}
              title="Colour-Based Object Sorting Robotic Arm"
              tags={["Robotics", "Arduino", "Hardware"]}
              description="A real-time colour-sorting robotic arm system built on Arduino Uno. Uses a TCS3200 colour sensor to detect object colour and drives servo motors and an electromagnet to automate pick-and-place sorting — no manual input required once calibrated."
              features={[
                "TCS3200 colour sensor for real-time RGB detection and classification",
                "Servo motor control for precise multi-axis arm positioning",
                "Electromagnet for contactless magnetic object gripping and release",
                "Fully autonomous sorting loop — detects, classifies, picks, and places without human intervention",
              ]}
              techStack={["Arduino Uno", "C++", "TCS3200", "Servo Motors", "Electromagnet"]}
              ghLink="#"
            />
          </Col>

          {/* ── Racing Simulator ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={chatify}
              title="Racing Simulator for Gaming Console"
              tags={["Hardware", "Electronics", "DIY"]}
              description="A custom-built racing simulator peripheral using a gaming controller motherboard. Features a handcrafted steering wheel with paddle shifters, control buttons, and sensitive potentiometer-based pedals — delivering a realistic sim-racing experience at a fraction of commercial product costs."
              features={[
                "Custom steering wheel with integrated paddle shifters and control buttons",
                "Potentiometer-based pedals providing analogue input for throttle, brake, and clutch",
                "Gaming controller motherboard repurposed as the input interface — plug-and-play with any console or PC",
                "Designed and fabricated entirely from scratch — chassis, wiring, and calibration",
              ]}
              techStack={["Electronics", "Potentiometers", "Gaming Controller PCB", "Custom Fabrication"]}
              ghLink="#"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
