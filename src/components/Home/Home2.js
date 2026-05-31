import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>

            <p
              className="home-about-body"
              style={{ fontFamily: "'Raleway', sans-serif", lineHeight: "1.9", textAlign: "justify" }}
            >
              I'm an <b className="purple">AI Engineer</b> who builds systems
              that work in the real world — not just in notebooks. My focus is
              on turning complex AI capabilities into practical, deployable
              solutions that save time and create measurable impact.
              <br />
              <br />
              <b className="purple">Experience: </b>
              AI & Automations Intern at{" "}
              <b className="purple">Tericsoft Technology Solutions</b> — designing and shipping
              end-to-end intelligent pipelines combining{" "}
              <b className="purple">LLMs, RAG systems, voice AI agents</b>, and{" "}
              <b className="purple">n8n Agentic Workflows</b> used in production.<b className="purple"> (Feb 2026 - Present)</b>
              <br />
              <br />
              I'm particularly drawn to the space where{" "}
              <b className="purple">
                Generative AI meets automation
              </b>{" "}
              — building multi-agent systems that can reason, retrieve, and act
              autonomously. This extends to{" "}
              <b className="purple">voice AI agents</b> too — conversational
              systems that handle real-world tasks like appointment booking and
              customer feedback calls over the phone, without any human in the
              loop. I work across the full stack of AI development, from prompt
              engineering and model integration to{" "}
              <b className="purple">FastAPI backends</b>.
              <br />
              <br />
              Outside of software, I love delving into the physical world —
              building{" "}
              <b className="purple">Robotic Arms</b> and{" "}
              <b className="purple">Racing Simulators</b> that fuse hardware
              engineering with intelligent control systems.
            </p>

            {/* Quick-glance highlights */}
            <Row style={{ marginTop: "30px", gap: "10px 0" }}>
              {[
                { label: "Focus", value: "Agentic AI & Automation" },
                { label: "Experience", value: "AI Intern - Tericsoft" },
                { label: "Degree", value: "B.Tech AI — VJIT (2026)" },
                { label: "Based In", value: "Hyderabad, India" },
              ].map((item) => (
                <Col xs={6} md={3} key={item.label}>
                  <div
                    style={{
                      background: "rgba(199, 112, 240, 0.08)",
                      border: "1px solid rgba(199, 112, 240, 0.25)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#c770f0",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "whitesmoke", fontWeight: 600 }}>
                      {item.value}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
