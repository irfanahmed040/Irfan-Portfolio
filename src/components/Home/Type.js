import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Artificial Intelligence Engineer",
          "n8n Automations Builder",
          "Python Developer",
          "Agentic AI Developer",
          "Robotics Enthusiast",

        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
