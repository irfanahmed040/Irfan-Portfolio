import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import leaf from "../../Assets/Projects/leaf.png";
import thyroidImg from "../../Assets/Projects/thyroid.png";
import editor from "../../Assets/Projects/codeEditor.png";
import doctorImg from "../../Assets/Projects/doctor.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import robotImg from "../../Assets/Projects/robot.png";
// import seoAgent from "../../Assets/Projects/seo-agent.png"; // uncomment once image is saved

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "rgb(180,180,180)", fontFamily: "'Raleway', sans-serif", marginBottom: "40px" }}>
          From production AI systems built during my internship to published research and hands-on hardware builds — here's what I've been working on.
        </p>

        <Row>
          {/* ── SEO Blog Agent ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={bitsOfCode}
              title="Autonomous SEO Blog Research & Content Writing Pipeline"
              tags={["n8n", "Agentic AI", "LLM", "Automation", "Internship"]}
              description="Independently designed and built for Tericsoft, where it was actively used to publish SEO blogs on tericsoft.com. A fully automated n8n workflow that researches, plans, writes, and publishes blog posts — with human review kept at the decisions that actually matter."
              features={[
                "Production use at Tericsoft — content researched, written, and published live on tericsoft.com",
                "Live SERP + competitor analysis via DataForSEO — top-ranking pages scraped and analysed before writing a single word",
                "Multi-model pipeline — LLaMA 3.1 8B for extraction, GPT-4.1 mini for filtering, GPT-4.1 for strategy and final writing",
                "Human-in-the-loop at two checkpoints — content plan and final blog both reviewed before publishing",
              ]}
              techStack={["n8n", "GPT-4.1", "GPT-4.1 mini", "LLaMA 3.1 8B", "Groq", "DataForSEO", "Google Sheets", "GitHub Gists", "Notion", "JavaScript"]}
              ghLink="https://github.com/irfanahmed040/n8n-Blog-Writing-Workflow"
              demoLink="https://fanatical-fog-322.notion.site/SEO-Automation-2f611c48ddd7807393a1d2d872b47264?pvs=74"
              demoLabel="Notion Docs"
              demoVideo="https://drive.google.com/file/d/1M7CDPYNlVqN9M83QZpv5wfRECyHTdta_/preview"
              demoVideoLabel="Watch Promotional Video"
            />
          </Col>

          {/* ── Engineering Manager Bot ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={editor}
              title="AI-Powered Engineering Team Analytics Platform"
              tags={["Agentic AI", "RAG", "BigQuery", "Multi-LLM", "Internship Project"]}
              description="Built a platform that gives engineering managers at tericsoft natural language access to team performance data across GitHub, Jira, Keka HR, and more, queried live from 35 BigQuery tables. Four AI models work in sequence to retrieve schema, generate SQL, execute queries, and visualise results in a single conversational turn."
              features={[
                "Two modes — an 11-chart analytics dashboard (productivity scores, code churn, risk register) and a freeform NL→SQL chat interface",
                "4-model pipeline — LightRAG retrieval → Gemini 2.5 Flash SQL generation → BigQuery execution → Mistral Large visualisation",
                "Auto-repair SQL loop — dry-run validated against BigQuery, auto-fixed by Gemini up to 5 times on failure",
                "Custom LoopAgnosticLock — solved an asyncio conflict where LightRAG's module-level locks bound to the wrong Streamlit event loop across pages",
              ]}
              techStack={["Python", "Streamlit", "LightRAG", "Llama 4 Scout", "Gemini 2.5 Flash", "Mistral Large", "Groq", "Google BigQuery", "SentenceTransformers", "Plotly", "asyncio"]}
              confidential={true}
            />
          </Col>

          {/* ── Voice Appointment Booking Agent ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={doctorImg}
              imgFit="contain"
              title="Doctor Appointment Booking AI Voice Agent with Real-Time Availability Check"
              tags={["Voice AI", "ElevenLabs", "Make.com", "Automation", "Cal.com"]}
              description="A conversational voice agent handling end-to-end doctor appointment booking. Patients speak naturally — the agent checks slot availability, collects details, confirms everything back, and books — no human involvement required on the clinic's side."
              features={[
                "check_availability tool triggers a Make.com webhook → queries Cal.com → returns the nearest open slot in real time",
                "Guided detail collection and confirmation — agent gathers name, email, and phone, reads it back, and waits for verbal approval before booking",
                "book_appointment tool triggers a second Make.com scenario — creates the appointment in Cal.com and confirms details to the patient",
                "Custom patient-facing clinic frontend — built specifically for the doctor's clinic with a branded experience",
              ]}
              techStack={["ElevenLabs", "Make.com", "Cal.com", "Webhooks", "HTML/CSS/JS"]}
              demoVideo="https://drive.google.com/file/d/1QDX9KHOsEtiCych9ODAjbhwHGFU9NuCn/preview"
            />
          </Col>

          {/* ── Car Dealership Post-Purchase Survey ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={editor}
              imgFit="contain"
              title="AI Outbound Call Agent for Dealership Post-Purchase Follow-Ups"
              tags={["Voice AI", "ElevenLabs", "Make.com", "Twilio", "Automation"]}
              description="A fully automated post-purchase feedback system for a car dealership. Staff adds a customer row to Google Sheets and the system automatically calls them — personalized with their name and car — to collect structured feedback, with no human involvement after the sale."
              features={[
                "Google Sheets trigger — Make.com detects new rows and fires personalised outbound calls via ElevenLabs + Twilio instantly",
                "Calls personalised per customer — agent addresses them by name and references their specific car model and purchase date",
                "3-question voice survey — satisfaction score (1–10), sales process feedback, and open suggestions captured conversationally",
                "Full auto-logging — transcript, AI-generated summary, duration, and recording URL written to Google Sheets after every call",
              ]}
              techStack={["ElevenLabs", "Make.com", "Google Sheets", "Twilio", "Gemini 2.5 Flash", "Webhooks"]}
              demoVideo="https://drive.google.com/file/d/1tHY-4s50FaOYREoo2Sm4IulfliPRvfKb/preview"
              demoVideoLabel="Listen to Demo Call"
              demoType="audio"
            />
          </Col>

          {/* ── Thyroid Cancer Detection ── */}
          <Col md={12}>
            <ProjectCard
              imgPath={thyroidImg}
              imgFit="contain"
              title="Thyroid Cancer Detection - Bilinear CNN"
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
              imgPath={leaf}
              imgFit="fill"
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
