import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import resumePdf from "../../Assets/Irfan.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [, setNumPages] = useState(null);

  return (
    <div id="resume">
      <Container fluid className="resume-section" style={{ padding: "60px 0" }}>
        <Container>
          <Row style={{ alignItems: "center", justifyContent: "center" }}>

            {/* LEFT — download info */}
            <Col md={5} style={{ textAlign: "left", paddingRight: "40px" }}>
              <h1 style={{ fontSize: "2.3em", color: "white" }}>
                My <strong className="purple">Resume</strong>
              </h1>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                color: "rgb(180,180,180)",
                fontSize: "1rem",
                lineHeight: "1.8",
                margin: "20px 0 30px",
              }}>
                Download the latest version of my resume for a full overview of
                my experience, projects, and skills.
              </p>
              <Button
                variant="primary"
                href={resumePdf}
                download="Irfan_Mohammed_Ahmed_Resume.pdf"
                style={{
                  background: "rgba(199,112,240,0.15)",
                  border: "1px solid rgba(199,112,240,0.5)",
                  color: "white",
                  padding: "10px 28px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "1rem",
                }}
              >
                <AiOutlineDownload style={{ marginBottom: "2px" }} />
                &nbsp; Download CV
              </Button>
            </Col>

            {/* RIGHT — PDF first-page preview */}
            <Col md={5} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <div style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(199,112,240,0.25)",
                boxShadow: "0 8px 32px rgba(199,112,240,0.15)",
                maxWidth: "320px",
                width: "100%",
              }}>
                <Document
                  file={resumePdf}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  <Page pageNumber={1} width={320} />
                </Document>
              </div>
            </Col>

          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;
