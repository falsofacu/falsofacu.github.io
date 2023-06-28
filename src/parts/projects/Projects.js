import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const handleSliderBtnClick = (event) => {
    if (event.currentTarget.id === "slider-prev-btn") {
      console.log(1);
      focusedProj > 0 && setFocusedProj((prevState) => prevState - 1);
    } else {
      console.log(2);
      focusedProj < projAmount.current && setFocusedProj((prevState) => prevState + 1);
    }
  };

  const handleProjCardClick = (event) => {
    setFocusedProj(Number(event.currentTarget.dataset.projNumber));
  };

  //TODO: Complete this
  const handleProjCardBtnClick = (event) => {
    //! window.open(url, "_blank");
    //Change state of element to active
    setActiveProj(event.currentTarget.parentNode.dataset.projNumber);
  };

  const handleActiveProjClick = (event) => {};

  const modifySliderFocusedStatus = (projNum) => {
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

  const generateProjectCards = useCallback(() => {
    let elements = [];
    for (let i = 0; i < projectsJSON.length; i++) {
      elements.push(
        <div
          key={`proj-${i}`}
          id={`proj-${i}`}
          data-proj-number={i}
          data-status={modifySliderFocusedStatus(i)}
          data-url={projectsJSON[i].url}
          className="proj-card"
          onClick={handleProjCardClick}
        >
          <img src={require(`../../media/images/projects/${projectsJSON[i].img}`)} className="proj-img" alt={projectsJSON[i].alt}></img>
          <h3 className="proj-title">{projectsJSON[i].title}</h3>
          <p className="proj-description">{projectsJSON[i].description}</p>
          <button className="proj-button reset-btn" onClick={handleProjCardBtnClick}>
            Try it out!
          </button>
        </div>
      );
    }
    return elements;
  }, [projectsJSON, modifySliderFocusedStatus]);

  const playAnimations = () => {
    initialAnim.current = initializeTranslateYAnim("projects-section", 1800, 800);
    initialAnim.current.start();
  };

  useEffect(() => {
    playAnimations();
  }, []);

  //TODO: Conditional rendering active proj
  return (
    <section id="projects-section">
      {activeProj === -1 ? (
        <>
          <div id="proj-slider">
            <button id="prev-btn" className={"slider-btn reset-btn" + disablePrevBtn()} onClick={handleSliderBtnClick}>
              <i className={"arrow left" + disablePrevBtn()}></i>
            </button>
            {generateProjectCards()}
            <button id="next-btn" className={"slider-btn reset-btn" + disableNextBtn()} onClick={handleSliderBtnClick}>
              <i className={"arrow right" + disableNextBtn()}></i>
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 id="active-proj-title">{projectsJSON[activeProj].title}</h2>
          <div id="active-proj">
            <button id="prev-btn" className={"slider-btn reset-btn" + disablePrevBtn()} onClick={handleSliderBtnClick}>
              <i className={"arrow left" + disablePrevBtn()}></i>
            </button>
            <iframe id="active-proj-iframe" src={projectsJSON[activeProj].url}></iframe>
            <button id="next-btn" className={"slider-btn reset-btn" + disableNextBtn()} onClick={handleSliderBtnClick}>
              <i className={"arrow right" + disableNextBtn()}></i>
            </button>
            <button id="active-proj-back-btn" className={"slider-btn reset-btn" + disablePrevBtn()} onClick={handleActiveProjClick}></button>
          </div>
        </>
      )}
    </section>
  );
};

export default Projects;
