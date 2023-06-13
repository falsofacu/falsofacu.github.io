import React from "react";
import "./Presentation.css";
import PresentationButton from "./PresentationButton";
import PresentationText from "./PresentationText";

const Presentation = () => {
  return (
    <section id="presentation">
      <PresentationButton />
      <PresentationText />
    </section>
  )
}

export default Presentation;