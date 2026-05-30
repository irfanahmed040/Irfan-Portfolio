import React from "react";
import { Col, Row } from "react-bootstrap";
import { SiPython, SiC, SiMysql, SiPowerbi, SiArduino, SiHtml5, SiGithub, SiOpenai, SiFastapi, SiVercel, SiDocker } from "react-icons/si";
import { FaRobot, FaCode, FaProjectDiagram, FaLink, FaBrain, FaCogs } from "react-icons/fa";
import { BsStars, BsLightningChargeFill, BsChatSquareDotsFill } from "react-icons/bs";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiPython fontSize={"40px"} />
        <div className="tech-icons-text">Python</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaLink fontSize={"40px"} />
        <div className="tech-icons-text">Langchain</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaProjectDiagram fontSize={"40px"} />
        <div className="tech-icons-text">n8n Automation</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaRobot fontSize={"40px"} />
        <div className="tech-icons-text">Agentic AI</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaCode fontSize={"40px"} />
        <div className="tech-icons-text">Claude Code</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub fontSize={"40px"} />
        <div className="tech-icons-text">Github</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMysql fontSize={"40px"} />
        <div className="tech-icons-text">MySQL</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiOpenai fontSize={"40px"} />
        <div className="tech-icons-text">OpenAI API</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaBrain fontSize={"40px"} />
        <div className="tech-icons-text">HuggingFace</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsLightningChargeFill fontSize={"40px"} />
        <div className="tech-icons-text">Ollama</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi fontSize={"40px"} />
        <div className="tech-icons-text">FastAPI</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsChatSquareDotsFill fontSize={"40px"} />
        <div className="tech-icons-text">Prompt Engineering</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel fontSize={"40px"} />
        <div className="tech-icons-text">Vercel</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker fontSize={"40px"} />
        <div className="tech-icons-text">Docker</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsStars fontSize={"40px"} />
        <div className="tech-icons-text">Vibe Coding</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaCogs fontSize={"40px"} />
        <div className="tech-icons-text">Make.com</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiArduino fontSize={"40px"} />
        <div className="tech-icons-text">Robotics</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiC fontSize={"40px"} />
        <div className="tech-icons-text">C Programming</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiHtml5 fontSize={"40px"} />
        <div className="tech-icons-text">Web Development</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPowerbi fontSize={"40px"} />
        <div className="tech-icons-text">PowerBI</div>
      </Col>
    </Row>
  );
}

export default Techstack;

