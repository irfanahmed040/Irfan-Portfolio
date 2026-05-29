import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const pdfLink = "https://drive.google.com/file/d/1dLXFAWR1BUz7oeTVWOVoKSRKc2Da7DWZ/view?usp=sharing";
  const pdfPreviewLink = "https://drive.google.com/file/d/1dLXFAWR1BUz7oeTVWOVoKSRKc2Da7DWZ/preview";

  return (
    <div>
      <Container fluid className="resume-section" style={{ padding: "50px 0" }}>
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative", marginBottom: "30px", zIndex: 1 }}>
          <Button
            variant="primary"
            href={pdfLink}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume d-flex justify-content-center" style={{ zIndex: 1, position: "relative" }}>
          <iframe
            src={pdfPreviewLink}
            width={width > 786 ? "800px" : "100%"}
            height="1130px"
            allow="autoplay"
            style={{ border: "none", borderRadius: "10px" }}
            title="Resume"
          ></iframe>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "30px", zIndex: 1 }}>
          <Button
            variant="primary"
            href={pdfLink}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
