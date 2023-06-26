import React, { useEffect, useRef, useState } from "react";
import { initializeTranslateYAnim } from "../animations";
import projectsJSON from "./Projects.json";
import "./Projects.css";

const Projects = () => {
  const projAmount = useRef(projectsJSON.length - 1);
  const initialAnim = useRef();

  let [focusedProj, setFocusedProj] = useState(1);
  let [activeProj, setActiveProj] = useState(-1);

  const disablePrevBtn = () => {
    return focusedProj === 0 ? " disabled" : "";
  };

  const disableNextBtn = () => {
    return focusedProj === projAmount.current ? " disabled" : "";
  };

  const handleBtnClick = (event) => {
    if (event.currentTarget.id === "slider-prev-btn") {
      console.log(1);
      focusedProj > 0 && setFocusedProj((prevState) => prevState - 1);
    } else {
      console.log(2);
      focusedProj < projAmount.current && setFocusedProj((prevState) => prevState + 1);
    }
  };

  const handleProjClick = (event) => {
    setFocusedProj(Number(event.currentTarget.dataset.projNumber));
  };

  const modifySliderStatus = (projNum) => {
    switch (true) {
      case projNum > 0 && projNum - 1 === focusedProj:
        return "after";
      case projNum + 1 === focusedProj:
        return "before";
      case projNum === focusedProj:
        return "focused";
      case projNum > focusedProj:
        return "hidden-right";
      default:
        return "hidden-left";
    }
  };

  //TODO: Add run button
  const createProjHTML = () => {
    let elements = [];
    for (let i = 0; i < projectsJSON.length; i++) {
      elements.push(
        <div
          key={`proj-${i}`}
          id={`proj-${i}`}
          data-proj-number={i}
          data-status={modifySliderStatus(i)}
          className="proj-card"
          onClick={handleProjClick}
        >
          <img src={require(`../../media/images/${projectsJSON[i].img}`)} className="proj-img" alt={projectsJSON[i].alt}></img>
          <h2 className="proj-title">{projectsJSON[i].title}</h2>
          <p className="proj-description">{projectsJSON[i].description}</p>
          <button className="proj-button reset-btn">Try it out!</button>
        </div>
      );
    }
    return elements;
  };

  const playAnimations = () => {
    initialAnim.current = initializeTranslateYAnim("projects-section", 1800, 800);
    initialAnim.current.start();
  };

  useEffect(() => {
    playAnimations();
  }, []);

  useEffect(() => {}, [focusedProj]);

  return (
    <section id="projects-section">
      {createProjHTML()}
      <button id="slider-prev-btn" className={"slider-btn reset-btn" + disablePrevBtn()} onClick={handleBtnClick}>
        <i className="arrow left"></i>
      </button>
      <button id="slider-next-btn" className={"slider-btn reset-btn" + disableNextBtn()} onClick={handleBtnClick}>
        <i className="arrow right"></i>
      </button>
    </section>
  );
};

export default Projects;
