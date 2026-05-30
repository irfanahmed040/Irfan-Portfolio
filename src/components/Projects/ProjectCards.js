import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsGithub, BsLockFill, BsPlayCircleFill, BsXCircleFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { ImPointRight } from "react-icons/im";

function ProjectCards(props) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      style={{
        background: "rgba(199, 112, 240, 0.05)",
        border: "1px solid rgba(199, 112, 240, 0.2)",
        borderRadius: "16px",
        padding: "28px",
        marginBottom: "30px",
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <Row style={{ alignItems: "center" }}>
        {/* Image */}
        <Col md={4} style={{ marginBottom: "20px" }}>
          <img
            src={props.imgPath}
            alt={props.title}
            style={{
              width: "100%",
              borderRadius: "12px",
              objectFit: props.imgFit || "cover",
              maxHeight: props.imgHeight || "220px",
              border: "1px solid rgba(199,112,240,0.2)",
            }}
          />
        </Col>

        {/* Content */}
        <Col md={8}>
          {/* Title + tags */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
            <h4 style={{ color: "white", margin: 0, fontFamily: "'Orbitron', sans-serif", fontSize: "1.1rem" }}>
              {props.title}
            </h4>
            {props.tags && props.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(199,112,240,0.15)",
                  color: "#c770f0",
                  fontSize: "0.7rem",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  border: "1px solid rgba(199,112,240,0.3)",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p style={{ color: "rgb(200,200,200)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "14px" }}>
            {props.description}
          </p>

          {/* Feature bullets */}
          {props.features && (
            <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: "16px" }}>
              {props.features.map((f) => (
                <li key={f} style={{ color: "rgb(180,180,180)", fontSize: "0.93rem", marginBottom: "5px", display: "flex", gap: "8px" }}>
                  <ImPointRight style={{ color: "#c770f0", marginTop: "3px", flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech stack badges */}
          {props.techStack && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
              {props.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgb(210,210,210)",
                    fontSize: "0.72rem",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            {props.ghLink && props.ghLink !== "#" && (
              <Button
                variant="outline-light"
                href={props.ghLink}
                target="_blank"
                size="sm"
                style={{ borderColor: "rgba(199,112,240,0.5)", color: "white" }}
              >
                <BsGithub /> &nbsp; GitHub
              </Button>
            )}
            {props.demoLink && (
              <Button
                variant="outline-light"
                href={props.demoLink}
                target="_blank"
                size="sm"
                style={{ borderColor: "rgba(199,112,240,0.5)", color: "white" }}
              >
                <CgWebsite /> &nbsp; {props.demoLabel || "Demo"}
              </Button>
            )}
            {props.demoVideo && (
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setShowVideo(!showVideo)}
                style={{
                  borderColor: showVideo ? "rgba(199,112,240,0.8)" : "rgba(199,112,240,0.5)",
                  color: "white",
                  background: showVideo ? "rgba(199,112,240,0.15)" : "transparent",
                }}
              >
                {showVideo
                  ? <><BsXCircleFill /> &nbsp; Close {props.demoVideoLabel || "Demo"}</>
                  : <><BsPlayCircleFill /> &nbsp; {props.demoVideoLabel || "Watch Demo"}</>
                }
              </Button>
            )}
            {props.confidential && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.78rem",
                  color: "rgba(199,112,240,0.7)",
                  border: "1px solid rgba(199,112,240,0.25)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                <BsLockFill size={11} />
                Source code confidential — internship IP
              </span>
            )}
          </div>
        </Col>
      </Row>

      {/* Inline video player — expands below the card content */}
      {props.demoVideo && showVideo && (
        <div
          style={{
            marginTop: "24px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(199,112,240,0.3)",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          {/* Video label bar */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid rgba(199,112,240,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.8rem",
              color: "#c770f0",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            <BsPlayCircleFill size={13} />
            Live Demo — {props.title}
          </div>
          {/* Audio: compact player / Video: 16:9 frame */}
          {props.demoType === "audio" ? (
            <div style={{ padding: "16px" }}>
              <iframe
                src={props.demoVideo}
                title={`${props.title} demo`}
                allow="autoplay"
                style={{ width: "100%", height: "80px", border: "none" }}
              />
            </div>
          ) : (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={props.demoVideo}
                title={`${props.title} demo`}
                allow="autoplay"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectCards;
