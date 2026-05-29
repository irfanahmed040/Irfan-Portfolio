import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Robot3D from "./Robot3D";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home() {
  return (
    <section>
      {/* ── Hero ── */}
      <div
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#0c0513",
          overflow: "hidden",
        }}
      >
        <Particle />

        {/* Robot fills the whole section */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Robot3D />
        </div>

        {/* Side vignette — darkens left & right so text stays readable,
            keeps the centre clear for the robot.
            pointer-events: none so cursor reaches the iframe */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(to right, rgba(12,5,19,0.82) 0%, transparent 28%, transparent 72%, rgba(12,5,19,0.82) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Three-column overlay:
            left text | empty centre (robot) | right typewriter
            All pointer-events: none so every mouse move hits the iframe */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "100vh",
            padding: "80px 5% 0",
            pointerEvents: "none",
          }}
        >
          {/* LEFT — name / greeting */}
          <div style={{ flex: "0 0 40%", textAlign: "left" }}>
            <h1
              style={{
                paddingBottom: 15,
                color: "white",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              className="heading"
            >
              Hi There!{" "}
              <span className="wave" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>
            <h1
              className="heading-name"
              style={{
                color: "white",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.03em",
              }}
            >
              I'm
              <strong className="main-name"> Irfan Mohammed Ahmed</strong>
            </h1>
          </div>

          {/* CENTRE — empty so the robot shows through */}
          <div style={{ flex: "0 0 38%" }} />

          {/* RIGHT — typewriter roles */}
          <div
            style={{
              flex: "0 0 25%",
              textAlign: "left",
              pointerEvents: "auto",
            }}
          >
            <Type />
          </div>
        </div>
      </div>

      <Home2 />

      <Container>
        <Row style={{ paddingTop: "50px", paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/irfanahmed040"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/irfan-mohammed-ahmed-826306201/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
